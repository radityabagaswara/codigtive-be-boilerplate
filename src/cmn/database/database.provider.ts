import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DbCfg } from '../../config/DbCfg';

/**
 * Setup default connection in the application
 * @param configService {ConfigService}
 */
const defaultConnection = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbCfg = new DbCfg(configService).toObj();
  return {
    type: 'postgres',
    host: dbCfg.host,
    port: dbCfg.port,
    username: dbCfg.username,
    password: dbCfg.password,
    database: dbCfg.database,
    autoLoadEntities: dbCfg.env == 'development',
    synchronize: dbCfg.env == 'development',
    logging: dbCfg.env == 'development',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  };
};

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: defaultConnection,
    inject: [ConfigService],
  }),
];
