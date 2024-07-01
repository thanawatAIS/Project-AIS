import { User } from '../../auth/schemas/user.schema';
export declare class UpdateRentalDto {
    readonly user: User;
    readonly bookID: string;
}
