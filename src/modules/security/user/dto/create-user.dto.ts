import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(4, 20)
  username: string;

  @ApiProperty({
    description:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and must be at least 8 characters',
  })
  @Length(8, 20)
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @Length(5, 95)
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(5, 90)
  name: string;
}
