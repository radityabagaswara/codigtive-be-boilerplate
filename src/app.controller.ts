import {
  Controller,
  Get,
  Injectable,
  Query,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PageableRequestDto } from './cmn/pageable/dto/pageable-request.dto';
import { AccessTokenGuard } from './cmn/guards/jwt-access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/pageable')
  getPageable(@Query() pageableDto: PageableRequestDto) {
    return this.appService.getPageable(pageableDto);
  }
}
