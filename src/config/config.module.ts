import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCfg } from './RedisCfg';
import { DbCfg } from './DbCfg';
import { UtilCfg } from './UtilCfg';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, RedisCfg, DbCfg, UtilCfg],
  exports: [ConfigService, RedisCfg, DbCfg, UtilCfg],
})
export class Config {}
