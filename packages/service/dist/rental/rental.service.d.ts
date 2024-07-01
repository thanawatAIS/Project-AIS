import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Rental } from './schemas/rental.schema';
import { User } from '../auth/schemas/user.schema';
export declare class RentalService {
    private rentalModel;
    constructor(rentalModel: mongoose.Model<Rental>);
    findAll(query: Query): Promise<Rental[]>;
    create(rental: Rental, user: User): Promise<Rental>;
    updateById(id: string, rental: Rental): Promise<Rental>;
}
