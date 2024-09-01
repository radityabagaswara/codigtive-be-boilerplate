import { Controller, Get, Injectable, Query, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { PageableRequestDto } from './cmn/pageable/dto/pageable-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/pageable')
  getPageable(@Query() pageableDto: PageableRequestDto) {
    return this.appService.getPageable(pageableDto);
  }
}
