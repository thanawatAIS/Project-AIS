import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user resetting the password' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The password reset token sent to the user' })
  passwordResetToken: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'The new password for the user', minLength: 6 })
  password: string;
}
