import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Fabricante } from './fabricante.entity';
import { Types } from 'mongoose';
import { Categoria, SubDocCategoria } from './categoria.entity';
import { CreateCategoryDTO } from 'productos/dtos/categorias.dto';

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
      type: { SubDocCategoria },
    }),
  )
  categoria: Categoria;

  @Prop({ type: Types.ObjectId, ref: Fabricante.name })
  fabricante: Fabricante | Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
