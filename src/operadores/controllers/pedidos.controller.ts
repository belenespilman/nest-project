import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PedidosService } from '../services/pedidos.service';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private pedidoService: PedidosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAllPedidos(): any {
    return this.pedidoService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Obtener pedido por ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getPedidoById() {}

  @Post()
  @ApiOperation({ summary: 'Crear un pedido' })
  createPedido() {}

  @Put()
  @ApiOperation({ summary: 'Modificar/Actualizar un pedido' })
  updatePedido() {}

  @Delete()
  @ApiOperation({ summary: 'Eliminar un pedido' })
  deletePedido() {}
}
