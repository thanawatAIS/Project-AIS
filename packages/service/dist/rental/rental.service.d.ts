import * as mongoose from 'mongoose';
import { Rental } from './schemas/rental.schema';
import { User } from '../auth/schemas/user.schema';
export declare class RentalService {
    private rentalModel;
    constructor(rentalModel: mongoose.Model<Rental>);
    create(rental: Rental, user: User): Promise<Rental>;
    updateById(id: string, rental: Rental): Promise<Rental>;
}
