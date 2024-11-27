import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Comprador {
  @Prop({ type: String })
  nombre: string;

  @Prop({ type: String })
  apellido: string;

  @Prop({ type: Number })
  telefono: number;

  @Prop({
    type: [
      {
        calle: { type: String },
        numero: { type: String },
        ciudad: { type: String },
      },
    ],
  })
  direcciones: Types.Array<Record<string, any>>;
}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);
