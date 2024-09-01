import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './token.entity';
import { WithDeleteAudit } from '../base/with-delete-audit';
import { CreateUserDto } from '../../modules/security/user/dto/create-user.dto';
import { hashPassword } from '../../cmn/utils/passwordCrypt.utils';

@Entity({ schema: 'security' })
export class User extends WithDeleteAudit implements UserI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, unique: true })
  @Index()
  username: string;

  @Column('text')
  password: string;

  @Column('varchar', { length: 95, unique: true })
  @Index()
  email: string;

  @Column('varchar', { length: 90 })
  name: string;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column('boolean', { default: false })
  isLocked: boolean;

  @Column('boolean', { default: false })
  hasToChangePassword: boolean;

  @Column('timestamp', { nullable: true })
  lastLogin: Date;

  @Column('timestamp', { nullable: true })
  lastPasswordChange: Date;

  @Column('int', { default: 0 })
  loginAttempts: number;

  @Column('timestamp', { nullable: true })
  lastLoginAttempt: Date;

  //RELATIONS
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  static toDto(user: User): UserI {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      isLocked: user.isLocked,
      hasToChangePassword: user.hasToChangePassword,
      lastLogin: user.lastLogin,
      lastPasswordChange: user.lastPasswordChange,
      loginAttempts: user.loginAttempts,
      lastLoginAttempt: user.lastLoginAttempt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  static async fromDtoC(user: CreateUserDto): Promise<User> {
    const userEntity = new User();
    userEntity.username = user.username;
    userEntity.password = await hashPassword(user.password);
    userEntity.email = user.email;
    userEntity.name = user.name;
    return userEntity;
  }
}
