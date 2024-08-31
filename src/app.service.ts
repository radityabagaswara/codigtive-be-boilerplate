import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from './cmn/redis/redisClient.serviceImpl';
import { DbCfg } from './config/DbCfg';

@Injectable()
export class AppService {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}
  async getHello() {
    console.log('DbCfg', DbCfg.toString());

    await this.redisService.set('prefix', 'key', 'value');
    return 'Hello World!';
  }
}
