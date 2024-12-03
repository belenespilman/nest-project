import { Module } from '@nestjs/common';
import { CompradoresController } from '/operadores/controllers/compradores.controller';
import { OperadoresController } from '/operadores/controllers/operadores.controller';
import { PedidosController } from '/operadores/controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductosService } from '/productos/services/productos.service';
import { ProductosModule } from '/productos/productos.module';
import { Comprador, CompradorSchema } from './entities/comprador.entity';
import { Pedido, PedidosSchema } from './entities/pedido.entity';
import { Operador, OperadorSchema } from './entities/operador.entity';
import {
  DetallePedido,
  DetallePedidoSchema,
} from './entities/detallePedido.entity';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { DetallePedidoController } from './controllers/detalle-pedido.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comprador.name,
        schema: CompradorSchema,
      },
      {
        name: Pedido.name,
        schema: PedidosSchema,
      },
      {
        name: Operador.name,
        schema: OperadorSchema,
      },
      {
        name: DetallePedido.name,
        schema: DetallePedidoSchema,
      },
    ]),
    ProductosModule,
    PassportModule,
  ],
  controllers: [
    CompradoresController,
    PedidosController,
    OperadoresController,
    DetallePedidoController,
  ],
  providers: [
    PedidosService,
    CompradoresService,
    OperadoresService,
    DetallePedidoService,
  ],

  exports: [OperadoresService],
})
export class OperadoresModule {}
