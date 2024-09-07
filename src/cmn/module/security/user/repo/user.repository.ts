import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '../../../../transaction-manager/repository/transaction.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../../../../../database/entities/user.entity';
import { CreateUserDto } from '../../../../../modules/security/user/dto/create-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async findById(id: string): Promise<User> {
    return this.getRepository(User).findOne({ where: { id } });
  }
  async createUser(user: CreateUserDto): Promise<any> {
    return this.getRepository(User)
      .save(await User.fromDtoC(user))
      .then((res) => {
        return User.toDto(res);
      });
  }

  async findByEmail(email: string): Promise<User> {
    return this.getRepository(User).findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return this.getRepository(User).findOneBy({ username });
  }
}
