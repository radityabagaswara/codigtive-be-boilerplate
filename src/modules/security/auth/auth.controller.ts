import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './impl/auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from '../../../cmn/guards/jwt-refresh.guard';
import { AccessTokenGuard } from '../../../cmn/guards/jwt-access.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Get('refresh')
  refreshToken(@Req() req: any) {
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('self')
  getSelf(@Req() req: any) {
    const refreshToken = req.user['token'];
    const id = req.user['sub'];
    return this.authService.self(id, refreshToken);
  }
}
