import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Direcciones, SubDirecciones } from './direccones.entity';

@Schema()
export class Comprador {
  @Prop({ type: String })
  nombre: string;

  @Prop({ type: String })
  apellido: string;

  @Prop({ type: Number })
  telefono: number;

  @Prop({
    type: [SubDirecciones],
  })
  direcciones: Types.Array<Direcciones>;
}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);
