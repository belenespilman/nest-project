import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @ApiProperty({ description: 'ID de la cateogría' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
}

export class UpdateCategoryDTO extends PartialType(
  OmitType(CreateCategoryDTO, ['id']),
) {}
