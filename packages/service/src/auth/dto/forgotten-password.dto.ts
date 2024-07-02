import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgottenPasswordDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user requesting password reset',
  })
  email: string;
}
