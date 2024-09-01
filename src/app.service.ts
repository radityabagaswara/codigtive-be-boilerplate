import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from './cmn/redis/redisClient.serviceImpl';
import { DbCfg } from './config/DbCfg';
import { ApptestRepository } from './apptest.repository';
import { PageableResponseDto } from './cmn/pageable/dto/pageable-response.dto';
import { UsePageable } from './cmn/pageable/use-pageable';
import { Test } from '@nestjs/testing';
import { PageableRequestDto } from './cmn/pageable/dto/pageable-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    private readonly apptestRepo: ApptestRepository,
  ) {}

  async getHello() {
    // console.log('DbCfg', DbCfg.toString());

    // await this.redisService.set('prefix', 'key', 'value');

    const value = await this.apptestRepo.createMultiple('test');
    console.log(value);

    return value;
  }

  async getPageable(pageable: PageableRequestDto) {
    const data = await this.apptestRepo.getAllAndCount();
    return data;
  }
}
