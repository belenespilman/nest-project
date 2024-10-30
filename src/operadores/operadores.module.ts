import { Module } from '@nestjs/common';
import { CompradoresController } from 'src/operadores/controllers/compradores.controller';
import { OperadoresController } from 'src/operadores/controllers/operadores.controller';
import { PedidosController } from 'src/operadores/controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductosService } from 'src/productos/services/productos.service';
import { ProductosModule } from 'src/productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprador } from './entities/comprador.entity';
import { Pedido } from './entities/pedido.entity';
import { Operador } from './entities/operador.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comprador, Pedido, Operador]),
    ProductosModule,
  ],
  controllers: [CompradoresController, PedidosController, OperadoresController],
  providers: [PedidosService, CompradoresService, OperadoresService],
})
export class OperadoresModule {}
