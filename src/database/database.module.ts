import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { Producto } from '/productos/entities/producto.entity';
import { Categoria } from '/productos/entities/categoria.entity';
import { Comprador } from '/operadores/entities/comprador.entity';
import { Pedido } from '/operadores/entities/pedido.entity';
import { Fabricante } from '/productos/entities/fabricante.entity';
import { Operador } from '/operadores/entities/operador.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port: +configService.postgres.port,
          username: user,
          password,
          database: dbName,
          entities: [
            Producto,
            Categoria,
            Comprador,
            Pedido,
            Fabricante,
            Operador,
          ],
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
