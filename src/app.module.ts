import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './config/config.module';
import { RedisModule } from './cmn/redis/redisClient.module';
import { AllCmnModule } from './cmn/AllCmn.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/security/user/user.module';
import { AuthModule } from './modules/security/auth/auth.module';
import { DbinitModule } from './modules/dbinit/dbinit.module';

@Module({
  imports: [
    Config,
    RedisModule,
    AllCmnModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    DbinitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
