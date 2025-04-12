import { Inject, Injectable, Optional } from '@nestjs/common';
import { REDIS_MODULE_CONNECTION } from '../constants';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(
    @Optional()
    @Inject(REDIS_MODULE_CONNECTION.CACHE)
    private readonly client?: Redis,
  ) {}

  async get(key: string): Promise<string | null> {
    if (!this?.client) {
      return null;
    }
    return this.client.get(key);
  }

  async set({
    record,
    expires,
  }: {
    record: { key: string; value: string };
    expires: number;
  }): Promise<void> {
    if (!this?.client) {
      return;
    }
    await this.client.set(record.key, record.value, 'EX', expires);
  }

  async del(key: string): Promise<void> {
    if (!this?.client) {
      return;
    }
    await this.client.del(key);
  }
}
