import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PedidosService } from '../services/pedidos.service';
import { ParseIntPipe } from 'common/parse-int.pipe';
import { CreatePedidoDTO, UpdatePedidoDTO } from 'operadores/dtos/pedidos.dto';

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

  @Get('/:PedidoId')
  @ApiOperation({ summary: 'Obtener pedido por ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getPedidoById(@Param('PedidoId', ParseIntPipe) PedidoId: number) {
    return this.pedidoService.findOne(PedidoId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un pedido' })
  createPedido(@Body() payload: CreatePedidoDTO) {
    return this.pedidoService.createPedido(payload);
  }

  @Put(':/PedidoId')
  @ApiOperation({ summary: 'Modificar/Actualizar un pedido' })
  updatePedido(
    @Param('PedidoId', ParseIntPipe) PedidoId: number,
    @Body() payload: UpdatePedidoDTO,
  ) {
    return this.pedidoService.updatePedido(PedidoId, payload);
  }

  @Delete(':/PedidoId')
  @ApiOperation({ summary: 'Eliminar un pedido' })
  deletePedido(@Param('PedidoId', ParseIntPipe) PedidoId: number) {
    return this.pedidoService.deletePedido(PedidoId);
  }
}
