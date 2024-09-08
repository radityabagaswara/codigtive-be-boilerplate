import { Module } from '@nestjs/common';
import { AuthService } from './impl/auth.service';
import { AuthController } from './auth.controller';
import { UtilCfg } from '../../../config/UtilCfg';
import { UserRepository } from '../../../cmn/module/security/user/repo/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from '../../../cmn/strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from '../../../cmn/strategy/jwt-refresh.strategy';
import { TokenAuthService } from './impl/token-auth.service';
import { TokenRepository } from '../../../cmn/module/security/user/repo/token.repository';
import { RedisAuthService } from './impl/redis-auth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    UtilCfg,
    UserRepository,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    TokenAuthService,
    TokenRepository,
    RedisAuthService,
  ],
})
export class AuthModule {}
