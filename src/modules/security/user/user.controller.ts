import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './service/impl/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async createUser(@Body() dto: CreateUserDto): Promise<string> {
    return this.userService.createUser(dto);
  }
}
