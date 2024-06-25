// import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// export class LoginDto {
//   @IsNotEmpty()
//   @IsEmail({}, { message: 'Please enter correct email' })
//   readonly email: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(6)
//   readonly password: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password123', description: 'The password of the user (minimum 6 characters)' })
  readonly password: string;
}