import { Column, DeleteDateColumn } from 'typeorm';
import { WithAudit } from './with-audit';

export abstract class WithDeleteAudit extends WithAudit {
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column('varchar', { length: 50, nullable: true, default: 'SYSTEM' })
  deletedBy: string;
}
