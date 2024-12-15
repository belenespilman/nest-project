import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Direcciones {
  @Prop({ type: String })
  calle: string;

  @Prop({ type: Number })
  numero: number;

  @Prop({ type: String })
  ciudad: string;
}

export const SubDirecciones = SchemaFactory.createForClass(Direcciones);
