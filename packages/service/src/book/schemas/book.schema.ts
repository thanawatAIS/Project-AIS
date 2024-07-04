import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  COMEDY = 'Comedy',
  FOOD = 'Food',
  HISTORY = 'History',
  BIOGRAPHY = 'Biography',
  SCIENCE = 'Science',
  SELF_HELP = 'Self Help',
  THRILLER = 'Thriller',
  MYSTERY = 'Mystery',
  CHILDREN = 'Children',
  SCIENCE_FICTION = 'Science Fiction',
  POETRY = 'Poetry',
  DRAMA = 'Drama',
  RELIGION = 'Religion',
}


@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop({ enum: Category })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
