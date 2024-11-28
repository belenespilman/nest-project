import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Producto } from 'productos/entities/producto.entity';

@Schema()
export class Pedido {
  @Prop({ type: String })
  nombre: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Producto.name }] })
  productos: Types.Array<Producto>;
}

export const PedidosSchema = SchemaFactory.createForClass(Pedido);
