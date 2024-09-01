import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class WithAudit implements WithAuditI {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column('varchar', { length: 50, nullable: true, default: 'SYSTEM' })
  createdBy: string;

  @Column('varchar', { length: 50, nullable: true, default: null })
  updatedBy: string;
}
