import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Document } from 'mongoose';

@Schema()
export class Operador extends Document {
  @Prop({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ type: String })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export const OperadorSchema = SchemaFactory.createForClass(Operador);
