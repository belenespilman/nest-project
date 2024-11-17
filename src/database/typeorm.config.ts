import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const configService = new ConfigService();

const parentDir = path.dirname(__dirname);
const distDir = path.resolve(parentDir, '../dist');
console.log(distDir);

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [
    path.join(parentDir, 'productos/entities/*.ts'),
    path.join(parentDir, 'operadores/entities/*.ts'),
    path.join(distDir, 'productos/entities/*.js'),
    path.join(distDir, 'operadores/entities/*.js'),
  ],
  migrations: [
    path.resolve(__dirname, 'migrations/*.ts'),
    path.resolve(__dirname, 'migrations/*.js'),
  ],

  migrationsTableName: 'migrations',
  logging: true,
  synchronize: false,
});
