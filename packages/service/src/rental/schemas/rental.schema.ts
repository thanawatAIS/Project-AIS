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

  @Prop({ type: [{ date: { type: Date, default: Date.now }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }] })
  rentHistory: Array<{ date: Date, user: mongoose.Types.ObjectId }>;

  @Prop({ type: [{ date: { type: Date, default: Date.now }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }] })
  returnHistory: Array<{ date: Date, user: mongoose.Types.ObjectId }>;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
