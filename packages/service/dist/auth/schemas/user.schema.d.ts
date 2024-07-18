import { Document } from 'mongoose';
import { Role } from '../roles/roles.enum';
export declare class User extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}>>;
