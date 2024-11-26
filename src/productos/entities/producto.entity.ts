import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Producto {
  @Prop()
  id: number;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: Number })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
