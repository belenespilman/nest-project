import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Producto {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: Number, index: true })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;

  @Prop(
    raw({
      nombre: { type: String },
      imagen: { type: String },
    }),
  )
  categoria: Record<string, any>;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
