interface WithAuditI {
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

interface WithDeletedAuditI extends WithAuditI {
  deletedAt?: Date;
  deletedBy?: string;
}
