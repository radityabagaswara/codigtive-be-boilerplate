import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from './cmn/transaction-manager/repository/transaction.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Test } from './database/entities/test.entity';
import { WithPageable } from './cmn/pageable/with-pageable';

@Injectable({ scope: Scope.REQUEST })
export class ApptestRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  getAllAndCount(): Promise<any> {
    return new WithPageable().getPageableData({
      repo: this.getRepository(Test),
      paginationDto: { page: 1, limit: 10 },
      // withFilter: { field: 'username', value: 'test' },
      withQuery: { select: ['username'] },
    });
  }

  async createTest(string: string): Promise<Test> {
    return this.getRepository(Test)
      .save({ username: string })
      .then((res) => {
        return Test.toDto(res);
      });
  }

  async createMultiple(string: string): Promise<Test[]> {
    return this.getRepository(Test)
      .save([{ username: string }, { username: 'djwu9ahjwda' }])
      .then((res) => {
        console.log(res);
        return res.map((r) => Test.toDto(r));
      });
  }
}
