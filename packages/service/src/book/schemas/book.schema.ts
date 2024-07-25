import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { format } from 'date-fns';
import { Document, UpdateQuery} from 'mongoose';

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
export class Book extends Document {
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

  @Prop({
    type: String,
    set: (val: Date) => format(val, 'yyyy-MM-dd')
  })
  createdAt: string;

  @Prop({
    type: String,
    set: (val: Date) => format(val, 'yyyy-MM-dd')
  })
  updatedAt: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

// Middleware to format timestamps
BookSchema.pre('save', function (next) {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');

  if (!this.createdAt) {
    this.createdAt = formattedDate;
  }

  this.updatedAt = formattedDate;
  next();
});

BookSchema.pre('findOneAndUpdate', function (next) {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');

  const update = this.getUpdate() as UpdateQuery<any>;
  if (update) {
    if (update.$set) {
      update.$set.updatedAt = formattedDate;
    } else {
      update.updatedAt = formattedDate;
    }
  }
  next();
});

BookSchema.pre('updateOne', function (next) {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');

  const update = this.getUpdate() as UpdateQuery<any>;
  if (update) {
    if (update.$set) {
      update.$set.updatedAt = formattedDate;
    } else {
      update.updatedAt = formattedDate;
    }
  }
  next();
});