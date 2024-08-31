import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisCfg } from '../../config/RedisCfg';

export const RedisClient: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: () => {
    const redisInstance = new Redis({
      host: RedisCfg.host,
      port: RedisCfg.port,
    });

    redisInstance.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });

    return redisInstance;
  },
  inject: [],
};
