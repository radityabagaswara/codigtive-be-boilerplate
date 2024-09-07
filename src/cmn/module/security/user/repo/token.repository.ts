import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '../../../../transaction-manager/repository/transaction.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  Token,
  TokenType,
} from '../../../../../database/entities/token.entity';

@Injectable({ scope: Scope.REQUEST })
export class TokenRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async storeToken({
    token,
    userId,
    type,
    expiresAt,
  }: storeTokenI): Promise<any> {
    return this.getRepository(Token).save({
      token,
      user: { id: userId },
      type,
      expiresAt,
    });
  }

  async findByToken(token: string): Promise<Token> {
    return this.getRepository(Token).findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async deleteById(id: string | number): Promise<any> {
    return this.getRepository(Token).delete(id);
  }
}

interface storeTokenI {
  token: string;
  userId: string;
  type: TokenType;
  expiresAt: Date;
}
