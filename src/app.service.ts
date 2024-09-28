import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from './cmn/redis/redisClient.service';

import { PageableRequestDto } from './cmn/pageable/dto/pageable-request.dto';
import { statusUnauthorized } from './cmn/http/boolean-status';

@Injectable()
export class AppService {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
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
