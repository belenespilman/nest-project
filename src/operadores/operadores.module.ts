import { Module } from '@nestjs/common';
import { CompradoresController } from 'src/operadores/controllers/compradores.controller';
import { OperadoresController } from 'src/operadores/controllers/operadores.controller';
import { PedidosController } from 'src/operadores/controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  controllers: [CompradoresController, PedidosController, OperadoresController],
  providers: [PedidosService, CompradoresService, OperadoresService],
})
export class OperadoresModule {}
