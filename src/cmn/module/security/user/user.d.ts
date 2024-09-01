interface UserI extends WithDeletedAuditI {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  isActive: boolean;
  isLocked: boolean;
  hasToChangePassword: boolean;
  lastLogin: Date;
  lastPasswordChange: Date;
  loginAttempts: number;
  lastLoginAttempt: Date;
}
