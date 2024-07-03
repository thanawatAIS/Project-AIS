import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '667a83085c32b809ab7152dc',
    description: 'ID of the book',
  })
  readonly bookID: string;

  @IsString()
  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Rent Date' })
  readonly rentDate: string;

  @IsString()
  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Return Date' })
  readonly returnDate: string;
}
