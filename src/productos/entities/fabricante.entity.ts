import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Fabricante {
  @Prop({ type: String })
  nombre: string;

  @Prop({ type: String })
  direccion: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  imagen: string;
}

export const SubFabricante = SchemaFactory.createForClass(Fabricante);
