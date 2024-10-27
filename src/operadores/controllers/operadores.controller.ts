import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Param, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los operadores' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAllOperators(): any {
    return this.operadoresService.findAll();
  }

  @Get(':id/pedidos')
  @ApiOperation({ summary: 'Obtener operador por ID' })
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }
}
