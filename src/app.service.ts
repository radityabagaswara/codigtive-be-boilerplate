import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from './cmn/redis/redisClient.service';
import { ApptestRepository } from './apptest.repository';

import { PageableRequestDto } from './cmn/pageable/dto/pageable-request.dto';

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
  }

  async getPageable(pageable: PageableRequestDto) {
    // const data = await this.apptestRepo.getAllAndCount();
    // return data;
  }
}
