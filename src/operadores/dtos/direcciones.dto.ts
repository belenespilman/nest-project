import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDireccionesDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  calle: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ciudad: string;
}

export class UpdateDireccionesDTO extends PartialType(CreateDireccionesDTO) {}
