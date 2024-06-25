import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Category } from '../schemas/book.schema';
import { ApiProperty } from '@nestjs/swagger';


export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Roshidere', description: 'Title of the book' })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Alya is speaking India in her daily life.', description: 'Description of the Book' })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Bob the Builder', description: 'Author of the Book' })
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '100', description: 'Price of the Book' })
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category.' })
  @ApiProperty({ example: 'Romance', description: 'Category of the Book' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
