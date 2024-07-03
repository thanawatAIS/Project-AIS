import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './schemas/rental.schema';
export declare class RentalController {
    private rentalService;
    constructor(rentalService: RentalService);
    getAllBooksWithoutFilters(): Promise<Rental[]>;
    createRental(rental: CreateRentalDto, req: any): Promise<Rental>;
    rentDate(id: string, rental: UpdateRentalDto): Promise<Rental>;
    returnDate(id: string, rental: UpdateRentalDto): Promise<Rental>;
    deleteBook(id: string): Promise<Rental>;
}
