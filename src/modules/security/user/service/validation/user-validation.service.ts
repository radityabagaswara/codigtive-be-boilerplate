import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../../cmn/module/security/user/repo/user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { BadRequestDto } from '../../../../../cmn/http/dto/BadRequest.dto';

@Injectable()
export class UserValidationService {
  constructor(private useRepo: UserRepository) {}

  async createUserValidation(user: CreateUserDto): Promise<any> {
    if (await this.useRepo.findByEmail(user.email)) {
      throw new BadRequestException({
        message: BadRequestDto.toDto(
          new BadRequestDto('email', 'email already exists'),
        ),
      });
    }

    if (await this.useRepo.findByUsername(user.username)) {
      throw new BadRequestException({
        message: BadRequestDto.toDto(
          new BadRequestDto('username', 'username already exists'),
        ),
      });
    }
  }
}
