import { Model } from 'mongoose';
import { Rental } from './schemas/rental.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
export declare class RentalService {
    private rentalModel;
    constructor(rentalModel: Model<Rental>);
    findAll(): Promise<Rental[]>;
    create(rentalDto: CreateRentalDto, user: User): Promise<Rental>;
    updateRent(id: string, rentalDto: UpdateRentalDto): Promise<Rental>;
    updateReturn(id: string, rentalDto: UpdateRentalDto): Promise<Rental>;
    deleteById(id: string): Promise<Rental>;
}
