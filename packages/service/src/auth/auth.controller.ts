import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { getOriginHeader } from './utils/getOriginHeader';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Successful login', schema: {
    type: 'object',
    properties: {
      token: { type: 'string', description: 'Authentication token' },
    },
  }})
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('forgotten-password')
  @ApiBody({ type: ForgottenPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  forgottenPassword(@Body() body: ForgottenPasswordDto, @Req() req: Request): Promise<void> {
    return this.authService.forgottenPassword(body, getOriginHeader(req));
  }

  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successful', schema: {
    type: 'object',
    properties: {
      token: { type: 'string', description: 'Authentication token' },
      user: { 
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
        }
      }
    },
  }})
  resetPassword(@Body() body: ResetPasswordDto): Promise<{ token: string; user: any }> {
    return this.authService.resetPassword(body);
  }
}
