import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from './repo/redisClient.repo';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
    private readonly logger: LoggerService,
  ) {}

  async delete(prefix: string, key: string): Promise<void> {
    console.log('RedisService.delete', `${prefix}:${key}`);

    return await this.redisRepository.delete(prefix, key);
  }

  async get(prefix: string, key: string): Promise<string | null> {
    console.log('RedisService.get', `${prefix}:${key}`);

    return await this.redisRepository.get(prefix, key);
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    this.logger.verbose(`RedisService.set ${prefix}:${key} = ${value}`);
    return await this.redisRepository.set(prefix, key, value);
  }

  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    console.log(
      'RedisService.setWithExpiry',
      `${prefix}:${key} = ${value} (${expiry})`,
    );
    return await this.redisRepository.setWithExpiry(prefix, key, value, expiry);
  }
}
