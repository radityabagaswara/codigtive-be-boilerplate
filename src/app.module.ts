import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './config/config.module';
import { RedisModule } from './cmn/redis/redisClient.module';
import { AllCmnModule } from './cmn/AllCmn.module';
import { DatabaseModule } from './database/database.module';
import { ApptestRepository } from './apptest.repository';
import { UserModule } from './modules/security/user/user.module';

@Module({
  imports: [Config, RedisModule, AllCmnModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ApptestRepository],
})
export class AppModule {}
