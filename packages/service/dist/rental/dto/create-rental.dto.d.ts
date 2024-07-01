import { User } from '../../auth/schemas/user.schema';
export declare class CreateRentalDto {
    readonly user: User;
    readonly bookID: string;
    readonly rentDate: string;
    readonly returnDate: string;
}
