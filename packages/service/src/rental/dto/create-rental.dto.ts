import {
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '667a83085c32b809ab7152dc', description: 'ID of the book' })
    readonly bookID: string;

    @IsString()
    @ApiProperty({ example: '2024-07-01', description: 'Rent Date' })
    readonly rentDate: string;
  
    @IsString()
    @ApiProperty({ example: '2024-07-10', description: 'Return Date' })
    readonly returnDate: string;
}