import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbCfg {
  static port: number;
  static host: string;
  static username: string;
  static password: string;
  static database: string;
  static env: string;

  constructor(private readonly cfgService: ConfigService) {
    DbCfg.port = this.cfgService.get<number>('DB_PORT');
    DbCfg.host = this.cfgService.get<string>('DB_HOST');
    DbCfg.username = this.cfgService.get<string>('DB_USERNAME');
    DbCfg.password = this.cfgService.get<string>('DB_PASSWORD');
    DbCfg.database = this.cfgService.get<string>('DB_DATABASE');
    DbCfg.env = this.cfgService.get<string>('NODE_ENV');
  }

  public toObj() {
    return {
      port: DbCfg.port,
      host: DbCfg.host,
      username: DbCfg.username,
      password: DbCfg.password,
      database: DbCfg.database,
      env: DbCfg.env,
    };
  }

  static toString(): string {
    return `DbCfg: ${DbCfg.host}:${DbCfg.port}/${DbCfg.database} ${DbCfg.username}:${DbCfg.password}`;
  }
}
