import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { RedisService } from './redis/redisClient.service';
import { RedisRepository } from './redis/repo/redisClient.repo';
import { RedisClient } from './redis/redisClientFactory';

@Global()
@Module({
  providers: [LoggerService, RedisService, RedisRepository, RedisClient],
  exports: [LoggerService, RedisService, RedisRepository, RedisClient],
})
export class AllCmnModule {}
