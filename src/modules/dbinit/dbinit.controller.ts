import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbinitService } from './dbinit.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lab')
@Controller('lab')
export class DbinitController {
  constructor(
    private cfgService: ConfigService,
    private service: DbinitService,
  ) {}

  @Get('db-init')
  async init() {
    if (this.cfgService.get('NODE_ENV') != 'development') {
      throw new NotFoundException('Not Found');
    }
    return await this.service.init();
  }
}
