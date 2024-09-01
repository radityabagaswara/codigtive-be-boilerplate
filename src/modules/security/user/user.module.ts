import { Module } from '@nestjs/common';
import { UserService } from './service/impl/user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../../../cmn/module/security/user/repo/user.repository';
import { UserValidationService } from './service/validation/user-validation.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserValidationService],
})
export class UserModule {}
