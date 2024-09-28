import { Module } from '@nestjs/common';
import { UserInitService } from './user-init.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../security/user/user.module';
import { UserRepository } from '../../../cmn/module/security/user/repo/user.repository';

@Module({
  providers: [UserInitService, UserRepository],
  imports: [UserModule],
  exports: [UserInitService],
})
export class UserInitModule {}
