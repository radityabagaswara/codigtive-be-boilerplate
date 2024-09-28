import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '../../../../transaction-manager/repository/transaction.repository';
import { DataSource, UpdateResult } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../../../../../database/entities/security/user.entity';
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

  async addLoginAttempt(id: string): Promise<UpdateResult> {
    const cur = await this.getRepository(User).findOneBy({ id });
    if (cur.loginAttempts > 3) {
      return this.lockUser(id);
    }
    return this.getRepository(User).increment({ id: id }, 'loginAttempts', 1);
  }

  async resetLoginAttempts(id: string): Promise<UpdateResult> {
    return this.getRepository(User).update({ id }, { loginAttempts: 0 });
  }

  async lockUser(id: string): Promise<UpdateResult> {
    return this.getRepository(User).update({ id }, { isLocked: true });
  }
}
