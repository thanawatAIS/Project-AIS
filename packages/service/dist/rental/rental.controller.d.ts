import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './schemas/rental.schema';
export declare class RentalController {
    private rentalService;
    constructor(rentalService: RentalService);
    createRental(rental: CreateRentalDto, req: any): Promise<Rental>;
    updateRental(id: string, rental: UpdateRentalDto): Promise<Rental>;
}
