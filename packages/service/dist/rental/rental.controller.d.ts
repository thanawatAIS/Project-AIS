import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './schemas/rental.schema';
export declare class RentalController {
    private rentalService;
    constructor(rentalService: RentalService);
    getAllRentals(): Promise<Rental[]>;
    getRentalById(id: string): Promise<Rental>;
    createRental(rental: CreateRentalDto, req: any): Promise<Rental>;
    updateRent(id: string, rental: UpdateRentalDto): Promise<Rental>;
    updateReturn(id: string, rental: UpdateRentalDto): Promise<Rental>;
    deleteRental(id: string): Promise<Rental>;
}
