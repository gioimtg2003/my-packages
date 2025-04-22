import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('transaction')
  async getBalance() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.appService.getBalance();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
