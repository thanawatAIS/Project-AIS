import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Document } from 'mongoose';
export declare enum Category {
    ADVENTURE = "Adventure",
    CLASSICS = "Classics",
    CRIME = "Crime",
    FANTASY = "Fantasy",
    HORROR = "Horror",
    ROMANCE = "Romance",
    COMEDY = "Comedy",
    FOOD = "Food",
    HISTORY = "History",
    BIOGRAPHY = "Biography",
    SCIENCE = "Science",
    SELF_HELP = "Self Help",
    THRILLER = "Thriller",
    MYSTERY = "Mystery",
    CHILDREN = "Children",
    SCIENCE_FICTION = "Science Fiction",
    POETRY = "Poetry",
    DRAMA = "Drama",
    RELIGION = "Religion"
}
export declare class Book extends Document {
    title: string;
    description: string;
    author: string;
    price: number;
    category: Category;
    user: User;
    createdAt: string;
    updatedAt: string;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book> & Book & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, mongoose.FlatRecord<Book>> & mongoose.FlatRecord<Book> & Required<{
    _id: unknown;
}>>;
