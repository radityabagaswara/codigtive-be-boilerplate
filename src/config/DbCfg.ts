import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbCfg {
  static port: number;
  static host: string;
  static username: string;
  static password: string;
  static database: string;

  constructor(private readonly cfgService: ConfigService) {
    DbCfg.port = this.cfgService.get<number>('DB_PORT');
    DbCfg.host = this.cfgService.get<string>('DB_HOST');
    DbCfg.username = this.cfgService.get<string>('DB_USERNAME');
    DbCfg.password = this.cfgService.get<string>('DB_PASSWORD');
    DbCfg.database = this.cfgService.get<string>('DB_DATABASE');
  }

  static toString(): string {
    return `DbCfg: ${DbCfg.host}:${DbCfg.port}/${DbCfg.database} ${DbCfg.username}:${DbCfg.password}`;
  }
}
