import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Fabricante } from './fabricante.entity';
import { Types } from 'mongoose';
import { Categoria, SubDocCategoria } from './categoria.entity';

@Schema()
export class Producto {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ type: String })
  descripcion: string;

  @Prop({ type: Number, index: true })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop({ type: String })
  origen: string;

  @Prop({ type: String })
  imagen: string;

  @Prop(
    raw({
      type: { SubDocCategoria },
    }),
  )
  categoria: Categoria;

  @Prop({ type: Types.ObjectId, ref: Fabricante.name })
  fabricante: Fabricante | Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
