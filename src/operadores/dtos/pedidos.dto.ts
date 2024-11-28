import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePedidoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @ApiProperty({ description: 'Productos en el pedido' })
  @IsNotEmpty()
  @IsArray()
  readonly productos: string[];
}

export class UpdatePedidoDTO extends PartialType(
  OmitType(CreatePedidoDTO, ['productos']),
) {}
