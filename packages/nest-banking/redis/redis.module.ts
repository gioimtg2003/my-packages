import {
  DynamicModule,
  Global,
  Module,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { REDIS_MODULE_CONNECTION } from '../constants';
import Redis from 'ioredis';
import { RedisCacheService } from './redis.service';

export interface RedisModuleOptions {
  redis_url: string;
}

@Global()
@Module({})
export class RedisModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_MODULE_CONNECTION.CACHE,
          useFactory: () => {
            return new Redis(options.redis_url);
          },
        },
        RedisCacheService,
      ],
      exports: [RedisCacheService],
    };
  }

  onApplicationShutdown(_signal?: string) {
    return new Promise<void>(resolve => {
      const redis = this.moduleRef.get<Redis>(REDIS_MODULE_CONNECTION.CACHE);

      redis.quit().catch(err => {
        console.error('Error while quitting Redis:', err);
      });
      redis.on('end', () => {
        resolve();
      });
    });
  }
}
