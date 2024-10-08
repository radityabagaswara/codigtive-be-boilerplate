import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WithAudit } from '../../base/with-audit';

export enum TokenType {
  REFRESH = 'refresh',
  PASSWORD_RESET = 'password_reset',
  VERIFY_EMAIL = 'verify_email',
}

@Entity({ schema: 'security' })
export class Token extends WithAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true })
  @Index()
  token: string;

  @Column('enum', { enum: TokenType })
  type: TokenType;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  @Column('timestamp')
  expiresAt: Date;
}
