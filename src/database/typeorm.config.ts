import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [
    path.resolve(__dirname, 'src/operadores/entities/*.ts'),
    path.resolve(__dirname, 'src/productos/entities/*.ts'),
    path.resolve(__dirname, 'dist/operadores/entities/*.js'),
    path.resolve(__dirname, 'dist/productos/entities/*.js'),
  ],
  migrations: [
    path.resolve(__dirname, 'migrations/*.ts'),
    path.resolve(__dirname, 'migrations/*.js'),
  ],

  migrationsTableName: 'migrations',
  logging: true,
  synchronize: false,
});
