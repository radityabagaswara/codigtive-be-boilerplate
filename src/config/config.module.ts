import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCfg } from './RedisCfg';
import { DbCfg } from './DbCfg';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, RedisCfg, DbCfg],
})
export class Config {}
