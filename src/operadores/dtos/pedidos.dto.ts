import { Producto } from '/productos/entities/producto.entity';
import { Operador } from '../entities/operador.entity';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDTO {
  @ApiProperty({ description: 'Fecha del pedido' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ description: 'Fecha del pedido' })
  @Type(() => Date)
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({ description: 'Operador del pedido' })
  @IsNotEmpty()
  readonly operador: Operador;

  @ApiProperty({ description: 'Productos en el pedido' })
  @IsNotEmpty()
  @IsArray()
  readonly productos: Producto[];

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly compradorId: number;
}

export class UpdatePedidoDTO extends PartialType(CreatePedidoDTO) {}
