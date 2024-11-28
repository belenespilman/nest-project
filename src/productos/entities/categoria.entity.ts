import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Categoria {
  @Prop()
  nombre: string;

  @Prop()
  imagen: string;
}

export const SubDocCategoria = SchemaFactory.createForClass(Categoria);
