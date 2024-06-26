import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
export declare enum Category {
    ADVENTURE = "Adventure",
    CALSSICS = "Classics",
    CRIME = "Crime",
    FANTASY = "Fantasy",
    HORROR = "Horror",
    ROMANCE = "Romance",
    COMEDY = "Comedy",
    FOOD = "Food",
    HISTORY = "History"
}
export declare class Book {
    title: string;
    description: string;
    author: string;
    price: number;
    category: Category;
    user: User;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book> & Book & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, mongoose.FlatRecord<Book>> & mongoose.FlatRecord<Book> & {
    _id: mongoose.Types.ObjectId;
}>;
