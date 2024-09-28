import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../cmn/module/security/user/repo/user.repository';
import { CreateUserDto } from '../../security/user/dto/create-user.dto';

@Injectable()
export class UserInitService {
  constructor(private useRepo: UserRepository) {}

  async init() {
    const user = [
      new CreateUserDto(
        'raditya',
        'Password.1',
        'radityabagaswaraa@gmail.com',
        'raditya',
      ),
    ];
    for (let i = 0; i < user.length; i++) {
      await this.useRepo.createUser(user[i]);
    }
  }
}
