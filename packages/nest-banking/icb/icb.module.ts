import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BankModuleOptions } from '../types';
import { BANK_MODULE_CONNECTION } from '../constants';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '../redis';
import { ICBService } from './icb.service';

@Module({})
export class ICBModule {
  /**
   * Please store the passed parameters in the environment file and ignore them when pushing to github.
   */
  static forRoot(options: BankModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: BANK_MODULE_CONNECTION.ICB,
        useValue: options,
      },
      ICBService,
    ];

    const imports: any[] = [HttpModule];

    if (options.redis?.redis_url) {
      imports.push(
        RedisModule.forRoot({
          redis_url: options.redis.redis_url,
        }),
      );
    }

    return {
      module: ICBModule,
      imports,
      providers,
      exports: [ICBService],
    };
  }
}
