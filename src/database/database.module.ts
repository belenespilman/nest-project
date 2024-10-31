import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { Producto } from 'src/productos/entities/producto.entity';
import { Categoria } from 'src/productos/entities/categoria.entity';
import { Comprador } from 'src/operadores/entities/comprador.entity';
import { Pedido } from 'src/operadores/entities/pedido.entity';
import { Fabricante } from 'src/productos/entities/fabricante.entity';
import { Operador } from 'src/operadores/entities/operador.entity';

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
          port,
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
