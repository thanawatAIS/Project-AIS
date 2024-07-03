import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
export declare class Rental {
    bookID: string;
    user: User;
    rentDate: string;
    returnDate: string;
    rentHistory: Array<{
        date: Date;
        user: mongoose.Types.ObjectId;
    }>;
    returnHistory: Array<{
        date: Date;
        user: mongoose.Types.ObjectId;
    }>;
}
export declare const RentalSchema: mongoose.Schema<Rental, mongoose.Model<Rental, any, any, any, mongoose.Document<unknown, any, Rental> & Rental & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Rental, mongoose.Document<unknown, {}, mongoose.FlatRecord<Rental>> & mongoose.FlatRecord<Rental> & {
    _id: mongoose.Types.ObjectId;
}>;
