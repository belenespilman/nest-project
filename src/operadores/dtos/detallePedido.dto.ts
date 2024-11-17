import { IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDetallePedidoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly pedidoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly productoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly cantidad: number;
}

export class UpdateDetallePedidoDTO extends PartialType(
  CreateDetallePedidoDTO,
) {}
