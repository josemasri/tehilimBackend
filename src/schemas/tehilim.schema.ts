import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tehilim extends Document {
  @Prop()
  round: number;

  @Prop({
    type: [Number],
  })
  available: number[];

  @Prop({
    default: new Date(),
    type: Date,
  })
  createdAt: Date;
}

export const TehilimSchema = SchemaFactory.createForClass(Tehilim);
