import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
  timestamps: true,
  collection: 'rental',
})
export class Rental {
  @Prop()
  bookID: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  rentDate: string;

  @Prop()
  returnDate: string;
}
export const RentalSchema = SchemaFactory.createForClass(Rental);
