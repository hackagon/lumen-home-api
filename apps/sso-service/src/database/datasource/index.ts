import _ from 'lodash';
import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'libs/infra/src';
import path from 'path';
import { envPath } from '../../config';

dotenv.config({ path: envPath });
if (!process.env.APP_NAME) {
  const pathEnv = process.env.ENV ? `.env.${process.env.ENV.trim()}` : '.env';
  const migrationEnvPath = path.join(__dirname + `/../../../${pathEnv}`);
  dotenv.config({ path: migrationEnvPath });
}

const configService = new ConfigService({});

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: _.parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode: 'each',
  synchronize: false,
};

const datasource = new DataSource(typeormConfig);

export default datasource;
