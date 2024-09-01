import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725169132437 implements MigrationInterface {
    name = 'Migration1725169132437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_locked"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "has_to_change_password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_password_change"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login_attempts"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login_attempt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "expiresAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isLocked" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hasToChangePassword" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastPasswordChange" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "loginAttempts" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLoginAttempt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "test" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "test" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLoginAttempt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "loginAttempts"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastPasswordChange"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hasToChangePassword"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isLocked"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "test" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "test" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login_attempt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "login_attempts" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_password_change" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "has_to_change_password" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_locked" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "token" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "expires_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
