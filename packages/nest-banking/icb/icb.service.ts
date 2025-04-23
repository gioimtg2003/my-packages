import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Optional } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as qs from 'qs';
import { catchError, firstValueFrom } from 'rxjs';
import {
  BANK_MODULE_CONNECTION,
  BROWSER_INFO,
  CLIENT_INFO,
  ICB_API_URL,
  ICB_PUBLIC_KEY,
} from '../constants';
import { CryptoService } from '../crypto';
import { RedisCacheService } from '../redis/redis.service';
import { BankModuleOptions, IICBResponse } from '../types';
import { bypassCaptcha } from '../utils';

@Injectable()
export class ICBService {
  private captcha_id: string | null = null;
  private captcha_code: string | null = null;
  private sessionId: string | null = null;
  private isLoggedIn: boolean = false;

  private readonly CACHE_KEY = {
    LOGIN: 'vtb_login',
    SESSION: 'vtb_session',
  };

  constructor(
    private readonly httpService: HttpService,
    @Optional() private readonly cacheService: RedisCacheService,
    @Inject(BANK_MODULE_CONNECTION.ICB)
    private readonly config: BankModuleOptions,
    private readonly cryptoService: CryptoService,
  ) {}

  async getTransactions({
    search,
    endDate,
    limit,
    startDate,
  }: {
    search?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    let isLogin = this.isLoggedIn;

    if (this.cacheService) {
      isLogin = (await this.cacheService.get(this.CACHE_KEY.LOGIN)) === 'true';
      this.sessionId = await this.cacheService.get(this.CACHE_KEY.SESSION);
    }

    if (!isLogin) {
      await this.login(this.config.auth.username, this.config.auth.access_code);
      this.sessionId = !this.cacheService
        ? this.sessionId
        : await this.cacheService.get(this.CACHE_KEY.SESSION);
    }
    const requestId = this.generateRequestId();
    const dateNow = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

    const params = {
      accountNumber: `${this.config.auth.id_number}`,
      endDate: endDate || dateNow,
      startDate: startDate || yesterday,
      maxResult: String(limit || 10),
      pageNumber: 0,
      requestId: requestId,
      tranType: '',
      lang: 'vi',
      searchFromAmt: '',
      searchKey: search || '',
      searchToAmt: '',
    };

    const headers = await this.createHeaderNull();
    const body = await this.handleBodyRequest(params);

    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.config.baseUrl}/${ICB_API_URL.GET_HIST_TRANSACTIONS}`,
          { ...body },
          { headers, timeout: 10000 },
        )
        .pipe(
          catchError((error: any) => {
            throw error;
          }),
        ),
    );
    return response.data;
  }

  async login(username: string, password: string) {
    const requestId = this.generateRequestId();
    const captcha_code = await this.getCaptcha();

    const params = {
      accessCode: password,
      browserInfo: BROWSER_INFO,
      captchaCode: captcha_code,
      captchaId: this.captcha_id,
      clientInfo: CLIENT_INFO,
      lang: 'vi',
      requestId: requestId,
      userName: username,
      screenResolution: '1201x344',
    };

    const headers = await this.createHeaderNull();
    const body = await this.handleBodyRequest(params);

    const { data } = await firstValueFrom(
      this.httpService
        .post<IICBResponse>(
          `${this.config.baseUrl}/${ICB_API_URL.LOGIN}`,
          { ...body },
          { headers, timeout: 10000 },
        )
        .pipe(
          catchError(async (error: any) => {
            if (this.cacheService) {
              await this.cacheService.del(this.CACHE_KEY.LOGIN);
            } else {
              this.isLoggedIn = false;
              this.sessionId = null;
            }
            throw error;
          }),
        ),
    );

    if (this.cacheService) {
      await this.cacheService.set({
        record: { key: this.CACHE_KEY.SESSION, value: data.sessionId },
        expires: 60 * 5,
      });
      await this.cacheService.set({
        record: { key: this.CACHE_KEY.LOGIN, value: 'true' },
        expires: 60 * 5,
      });
    } else {
      this.sessionId = data.sessionId;
      this.isLoggedIn = true;
    }

    return data;
  }

  private async handleBodyRequest(param: {
    [key: string]: string | number | null;
  }) {
    let session: string | null = null;
    if (this.cacheService) {
      const isLogin = await this.cacheService.get(this.CACHE_KEY.LOGIN);
      if (isLogin === 'true') {
        session = await this.cacheService.get(this.CACHE_KEY.SESSION);
      }
    } else if (this.isLoggedIn) {
      session = this.sessionId;
    }

    if (session) {
      param['sessionId'] = session;
    }
    return this.encryptData(param);
  }

  private encryptData(data: { [key: string]: string | number | null }) {
    data['signature'] = this.cryptoService
      .md5(
        qs.stringify(data, {
          arrayFormat: 'repeat',
          sort: (a, b) => a.localeCompare(b),
        }),
      )
      .toString();

    const payload = JSON.stringify(data);
    const encrypt = this.cryptoService.encryptRsa(payload, ICB_PUBLIC_KEY);

    return {
      encrypted: encrypt,
    };
  }
  async getCaptcha() {
    this.captcha_id = this.generateCaptchaId();
    const headers = await this.createHeaderNull();

    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.config.baseUrl}/${ICB_API_URL.CAPTCHA}${this.captcha_id}`,
        {
          headers,
          timeout: 10000,
        },
      ),
    );
    this.captcha_code = String(bypassCaptcha(data));
    return this.captcha_code;
  }

  private generateRequestId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let requestId = '';

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      requestId += characters[randomIndex];
    }

    return `${requestId}|${Date.now()}`;
  }

  private generateCaptchaId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const captchaId = Array.from({ length: 9 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join('');
    return captchaId;
  }

  private async createHeaderNull() {
    const headers = {
      'Accept-Encoding': 'gzip',
      'Accept-Language': 'vi-VN',
      Accept: 'application/json',
      'Cache-Control': 'no-store, no-cache',
      'User-Agent': 'okhttp/3.11.0',
    };

    let session: string | null = null;
    if (this.cacheService) {
      const isLogin = await this.cacheService.get(this.CACHE_KEY.LOGIN);
      if (isLogin === 'true') {
        session = await this.cacheService.get(this.CACHE_KEY.SESSION);
      }
    } else if (this.isLoggedIn) {
      session = this.sessionId;
    }

    if (session) {
      headers['sessionId'] = session;
    }
    return headers;
  }
}
