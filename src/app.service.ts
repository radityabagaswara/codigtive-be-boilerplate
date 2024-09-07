import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from './cmn/redis/redisClient.service';
import { ApptestRepository } from './apptest.repository';

import { PageableRequestDto } from './cmn/pageable/dto/pageable-request.dto';
import { response } from 'express';
import { statusOk, statusUnauthorized } from './cmn/http/boolean-status';

@Injectable()
export class AppService {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    private readonly apptestRepo: ApptestRepository,
  ) {}

  async getHello() {
    // await this.redisService.set('prefix', 'key', 'value');
    //
    // const value = await this.apptestRepo.createMultiple('test');
    // console.log(value);
    // return value;
    return 'Hello World!';
  }

  async getPageable(pageable: PageableRequestDto) {
    // const data = await this.apptestRepo.getAllAndCount();
    // return data
    return statusUnauthorized();
  }
}
