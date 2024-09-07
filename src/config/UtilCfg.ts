import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilCfg {
  static aesSecret: string;

  constructor(private readonly cfgService: ConfigService) {
    UtilCfg.aesSecret = this.cfgService.get<string>('AES_SECRET');
  }

  public toObj() {
    return {
      aesSecret: UtilCfg.aesSecret,
    };
  }
}
