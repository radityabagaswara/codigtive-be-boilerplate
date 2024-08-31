import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisCfg {
  static host: string;
  static port: number;

  constructor(private readonly cfgService: ConfigService) {
    RedisCfg.host = this.cfgService.get<string>('REDIS_HOST');
    RedisCfg.port = this.cfgService.get<number>('REDIS_PORT');
  }
}
