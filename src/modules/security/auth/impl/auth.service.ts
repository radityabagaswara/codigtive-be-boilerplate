import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UserRepository } from '../../../../cmn/module/security/user/repo/user.repository';
import { BadRequestDto } from '../../../../cmn/http/dto/BadRequest.dto';
import { comparePassword } from '../../../../cmn/utils/passwordCrypt.utils';
import { TokenAuthService } from './token-auth.service';
import { TokenRepository } from '../../../../cmn/module/security/user/repo/token.repository';
import { TokenType } from '../../../../database/entities/token.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { RedisAuthService } from './redis-auth.service';

@Injectable()
export class AuthService implements AuthServiceI {
  constructor(
    @Inject(UserRepository) private readonly userRepo: UserRepository,
    private readonly tokenService: TokenAuthService,
    private readonly tokenRepo: TokenRepository,
    private readonly redisAuthService: RedisAuthService,
  ) {}

  async refreshToken(token: string) {
    const tokenData = await this.tokenRepo.findByToken(token);
    console.log(tokenData);
    if (!tokenData || tokenData.type !== TokenType.REFRESH || !tokenData.user) {
      throw new BadRequestException({
        message: BadRequestDto.toDto(
          new BadRequestDto('token', 'Session expired'),
        ),
      });
    }

    const user = await this.userRepo.findById(tokenData.user.id);

    const newToken = await this.tokenService.generateToken(user);

    await this.tokenRepo.storeToken({
      token: newToken.refreshToken,
      type: TokenType.REFRESH,
      userId: user.id,
      expiresAt: newToken.refreshExpirate,
    });

    await this.tokenRepo.deleteById(tokenData.id);
    await this.redisAuthService.deleteAccessRedis(user.id);

    await this.redisAuthService.storeAccessRedis(newToken.accessToken, user.id);

    return {
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
      user: await this.getUserData(user.id),
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    // const username = SecurityUtils.decrypt(
    //   this.utilCfg.toObj().aesSecret + createAuthDto.timestamp,
    //   createAuthDto.username,
    // );
    // const password = SecurityUtils.decrypt(
    //   this.utilCfg.toObj().aesSecret + createAuthDto.timestamp,
    //   createAuthDto.password,
    // );

    const username = createAuthDto.username;
    const password = createAuthDto.password;

    const user = await this.userRepo.findByUsername(username);

    if (!user) {
      throw new BadRequestException({
        message: BadRequestDto.toDto(
          new BadRequestDto(
            'username',
            'Credentials does not match in our records',
          ),
        ),
      });
    }

    const compare = await comparePassword(password, user.password);

    if (!compare) {
      throw new BadRequestException({
        message: BadRequestDto.toDto(
          new BadRequestDto(
            'email',
            'Credentials does not match in our records',
          ),
        ),
      });
    }

    const token = await this.tokenService.generateToken(user);
    await this.tokenRepo.storeToken({
      token: token.refreshToken,
      type: TokenType.REFRESH,
      userId: user.id,
      expiresAt: token.refreshExpirate,
    });

    await this.redisAuthService.storeAccessRedis(token.accessToken, user.id);

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      user: await this.getUserData(user.id),
    };
  }

  async self(userId: string, token: string) {
    //check redis
    const tokenRedis = await this.redisAuthService.getAccessRedis(userId);
    if (!tokenRedis || tokenRedis !== token) {
      throw new BadRequestException({
        message: BadRequestDto.toDto(
          new BadRequestDto('token', 'Session expired'),
        ),
      });
    }

    return ApiOkResponse();
  }

  async getUserData(id: string): Promise<any> {
    const user = await this.userRepo.findById(id);

    return {
      username: user.username,
      email: user.email,
    };
  }
}
