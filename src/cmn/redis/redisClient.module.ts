import { Module } from '@nestjs/common';
import { RedisClient } from './redisClientFactory';
import { RedisRepository } from './repo/redisClient.repo';
import { RedisService } from './redisClient.serviceImpl';

@Module({
  providers: [RedisClient, RedisRepository, RedisService],
  exports: [RedisClient, RedisRepository, RedisService],
})
export class RedisModule {}
