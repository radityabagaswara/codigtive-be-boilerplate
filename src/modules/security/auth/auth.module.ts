import { Module } from '@nestjs/common';
import { AuthService } from './impl/auth.service';
import { AuthController } from './auth.controller';
import { UtilCfg } from '../../../config/UtilCfg';
import { UserRepository } from '../../../cmn/module/security/user/repo/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from '../../../cmn/strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from '../../../cmn/strategy/jwt-refresh.strategy';
import { TokenService } from './impl/token.service';
import { TokenRepository } from '../../../cmn/module/security/user/repo/token.repository';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    UtilCfg,
    UserRepository,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    TokenService,
    TokenRepository,
  ],
})
export class AuthModule {}
