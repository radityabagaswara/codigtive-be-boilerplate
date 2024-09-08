import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../../cmn/redis/redisClient.service';

@Injectable()
export class RedisAuthService {
  constructor(private readonly redisService: RedisService) {}

  async storeAccessRedis(token: string, userId: string) {
    //15m
    await this.redisService.setWithExpiry('user.token', userId, token, 900); //default 15m
  }

  async getAccessRedis(userId: string) {
    return await this.redisService.get('user.token', userId);
  }

  async deleteAccessRedis(userId: string) {
    return await this.redisService.delete('user.token', userId);
  }
}
