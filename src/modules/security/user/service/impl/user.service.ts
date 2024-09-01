import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../../cmn/module/security/user/repo/user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { statusOk } from '../../../../../cmn/http/boolean-status';
import { UserValidationService } from '../validation/user-validation.service';

@Injectable()
export class UserService implements UserServiceI {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidation: UserValidationService,
  ) {}

  async createUser(user: CreateUserDto): Promise<string> {
    await this.userValidation.createUserValidation(user);
    await this.userRepository.createUser(user);
    return statusOk();
  }
}
