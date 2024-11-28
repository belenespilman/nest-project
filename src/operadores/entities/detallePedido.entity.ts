import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema()
export class DetallePedido {
  @Prop({ type: Number })
  @IsNumber()
  cantidad: number;
}

export const DetallePedidoSchema = SchemaFactory.createForClass(DetallePedido);
