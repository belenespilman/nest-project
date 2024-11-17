import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Producto } from 'productos/entities/producto.entity';

export class CreateCategoryDTO {
  @ApiProperty({ description: 'ID de la cateogría' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty()
  @IsOptional()
  productos: Producto[];
}

export class UpdateCategoryDTO extends PartialType(
  OmitType(CreateCategoryDTO, ['id']),
) {}
