import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WithAudit } from '../base/with-audit';

@Entity()
export class Test extends WithAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  username: string;

  static toDto(test: Test): Test {
    return {
      createdAt: test.createdAt,
      createdBy: test.createdBy,
      updatedAt: test.updatedAt,
      updatedBy: test.updatedBy,
      id: test.id,
      username: test.username,
    };
  }
}
