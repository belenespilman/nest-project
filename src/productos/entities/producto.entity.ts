import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';

@Schema()
export class Producto {
  @Expose()
  @Prop({ required: true })
  nombre: string;

  @Expose()
  @Prop()
  descripcion: string;

  @Expose()
  @Prop({ type: Number, index: true })
  precio: number;

  @Expose()
  @Prop({ type: Number })
  stock: number;

  @Expose()
  @Prop()
  origen: string;

  @Expose()
  @Prop()
  imagen: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
