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
import {
  AddProductsToPedidoDTO,
  CreatePedidoDTO,
  UpdatePedidoDTO,
} from 'operadores/dtos/pedidos.dto';
import { MongoldPipe } from 'common/mongold.pipe';

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
  getPedidoById(@Param('PedidoId', MongoldPipe) PedidoId: string) {
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
    @Param('PedidoId', MongoldPipe) PedidoId: string,
    @Body() payload: UpdatePedidoDTO,
  ) {
    return this.pedidoService.updatePedido(PedidoId, payload);
  }

  @Put(':id/productos')
  @ApiOperation({ summary: 'Agregar productos a un pedido' })
  addProducts(
    @Param('id') id: string,
    @Body() payload: AddProductsToPedidoDTO,
  ) {
    return this.pedidoService.AddProducts(id, payload.productsIds);
  }

  @Delete(':id/producto/:productId')
  @ApiOperation({ summary: 'Borrar un producto de un pedido' })
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.pedidoService.removeProduct(id, productId);
  }

  @Delete(':/PedidoId')
  @ApiOperation({ summary: 'Eliminar un pedido' })
  deletePedido(@Param('PedidoId', MongoldPipe) PedidoId: string) {
    return this.pedidoService.deletePedido(PedidoId);
  }
}
