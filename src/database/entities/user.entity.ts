import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './token.entity';
import { WithAudit } from '../with/with-audit';
import { WithDeleteAudit } from '../with/with-delete-audit';

@Entity({ schema: 'security' })
export class User extends WithDeleteAudit {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @Column('boolean')
  isActive: boolean;

  @Column('boolean')
  isLocked: boolean;

  @Column('boolean')
  hasToChangePassword: boolean;

  @Column('timestamp')
  lastLogin: Date;

  @Column('timestamp')
  lastPasswordChange: Date;

  @Column('int')
  loginAttempts: number;

  @Column('timestamp')
  lastLoginAttempt: Date;

  //RELATIONS
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
