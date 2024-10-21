import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {}
