import { Module } from '@nestjs/common';
import { CompradoresController } from 'src/controllers/compradores.controller';
import { OperadoresController } from 'src/controllers/operadores.controller';
import { PedidosController } from 'src/controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  controllers: [CompradoresController, PedidosController, OperadoresController],
  providers: [PedidosService, CompradoresService, OperadoresService],
})
export class OperadoresModule {}
