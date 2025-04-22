/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICBService } from '@gioimtg2003/nest-banking';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private ICBService: ICBService) {}

  async getBalance() {
    try {
      const data = await this.ICBService.getTransactions({});

      return data;
    } catch (error) {
      console.log('error', error?.response);
      throw new Error('Failed to fetch transactions');
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
