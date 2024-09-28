import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { addMinutes, addDays, parseISO } from 'date-fns';
import { User } from '../../../../database/entities/security/user.entity';

@Injectable()
export class TokenAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateToken(user: User): Promise<any> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          usrname: user.username,
          sub: user.id,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          usrname: user.username,
          sub: user.id,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    const refreshExpired = this.calculateExpirationDate(
      this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    );

    return { accessToken, refreshToken, refreshExpired: refreshExpired };
  }

  private calculateExpirationDate(expiration: string): Date {
    const duration = parseDuration(expiration);
    return duration.unit === 'm'
      ? addMinutes(new Date(), duration.value)
      : addDays(new Date(), duration.value);
  }
}
function parseDuration(duration: string): { value: number; unit: string } {
  const match = duration.match(/(\d+)([md])/);
  if (!match) {
    throw new Error('Invalid duration format');
  }
  return { value: parseInt(match[1], 10), unit: match[2] };
}
