import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRentalDto {
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString()
  @ApiProperty({ example: '667e2acb3b4af0a9f6f1bd30', description: 'User ID' })
  readonly user: User;

  @IsNotEmpty()
  @IsString()
  // @ApiProperty({
  //   example: '667a83085c32b809ab7152dc',
  //   description: 'ID of the book',
  // })
  readonly bookID: string;

  @IsString()
  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Rent Date' })
  readonly rentDate: string;

  @IsString()
  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Return Date' })
  readonly returnDate: string;
}
