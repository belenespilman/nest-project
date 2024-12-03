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
  UseGuards,
} from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';
import { MongoldPipe } from 'common/mongold.pipe';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

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
  getOperatorById(@Param('idOperator', MongoldPipe) idOperator: string): any {
    return this.operadoresService.findOne(idOperator);
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

  @Post()
  @ApiOperation({ summary: 'Crear operador' })
  createOperador(@Body() payload: CreateOperadorDTO): any {
    return this.operadoresService.createOperador(payload);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'encontrar op por email' })
  async findByEmail(@Param('email') email: string) {
    const operador = await this.operadoresService.findByEmail(email);
    return operador ? operador : { message: 'operador no encontrado' };
  }

  @Put('/:idOperator')
  @ApiOperation({ summary: 'Actualizar operador' })
  updateOperator(
    @Param('idOperador', MongoldPipe) idOperador: string,
    @Body() body: UpdateOperadorDTO,
  ): any {
    return this.operadoresService.updateOperador(idOperador, body);
  }

  @Delete('/:idOperator')
  @ApiOperation({ summary: 'Delete operator by ID' })
  deleteOperator(@Param('idOperator', MongoldPipe) idOperator: string): any {
    return this.operadoresService.deleteOperador(idOperator);
  }
}
