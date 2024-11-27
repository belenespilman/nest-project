import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Param,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { ParseIntPipe } from '/common/parse-int.pipe';
import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';

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

  @Get('/:idOperator')
  @ApiOperation({ summary: 'Obtener operador por ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOperatorById(@Param('idOperator', ParseIntPipe) idOperator: number): any {
    return this.operadoresService.findOne(+idOperator);
  }

  // @Get(':id/pedidos')
  // @ApiOperation({ summary: 'Obtener pedido por usuario' })
  // getOrders(@Param('id', ParseIntPipe) id: number) {
  //   return this.operadoresService.getOrderByUser(id);
  // }

  // @Get('tasks')
  // getTasks() {
  //   return this.operadoresService.getTasks();
  // }

  // @Post()
  // @ApiOperation({ summary: 'Crear operador' })
  // createOperador(@Body() payload: CreateOperadorDTO): any {
  //   return this.operadoresService.createOperador(payload);
  // }

  @Put('/:idOperator')
  @ApiOperation({ summary: 'Actualizar operador' })
  updateOperator(
    @Param('idOperador', ParseIntPipe) idOperador: number,
    @Body() body: UpdateOperadorDTO,
  ): any {
    return this.operadoresService.updateOperador(+idOperador, body);
  }

  @Delete('/:idOperator')
  @ApiOperation({ summary: 'Delete operator by ID' })
  deleteOperator(@Param('idOperator', ParseIntPipe) idOperator: number): any {
    return this.operadoresService.deleteOperador(+idOperator);
  }
}
