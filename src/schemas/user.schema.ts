import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  initial: number;

  @Prop()
  final: number;

  @Prop({
    default: new Date(),
    type: Date,
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
