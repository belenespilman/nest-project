import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'common/parse-int.pipe';
import { DetallePedidoService } from 'operadores/detalle-pedido.service';
import {
  CreateDetallePedidoDTO,
  UpdateDetallePedidoDTO,
} from 'operadores/dtos/detallePedido.dto';

@ApiTags('Detalle Pedido')
@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private detalleService: DetallePedidoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de Detalle de Pedido' })
  @HttpCode(HttpStatus.ACCEPTED)
  findAll() {
    return this.detalleService.findAll();
  }

  @Get(':/idDetallePedido')
  @ApiOperation({ summary: 'Obtener un detalle de pedido por id' })
  @HttpCode(HttpStatus.ACCEPTED)
  findById(@Param('idDetallePedido', ParseIntPipe) idDetallePedido: number) {
    return this.detalleService.findOne(+idDetallePedido);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un detalle de pedido' })
  create(@Body() payload: CreateDetallePedidoDTO) {
    return this.detalleService.create(payload);
  }

  @Put(':/idDetallePedido')
  @ApiOperation({ summary: 'Actualizar/Modificar un detalle de pedido' })
  updateDetalle(
    @Param('idDetallePedido', ParseIntPipe) idDetallePedido: number,
    @Body() data: UpdateDetallePedidoDTO,
  ) {
    return this.detalleService.update(+idDetallePedido, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Eliminar un detalle de pedido' })
  deleteDetallePedido(
    @Param('idDetallePedido', ParseIntPipe) idDetallePedido: number,
  ) {
    return this.detalleService.delete(+idDetallePedido);
  }
}
