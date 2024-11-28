import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class Categoria {
  @Prop({ type: String })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Prop({ type: String })
  @IsString()
  @IsNotEmpty()
  imagen: string;
}

export const SubDocCategoria = SchemaFactory.createForClass(Categoria);
