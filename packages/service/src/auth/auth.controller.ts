// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
// import { SignUpDto } from './dto/signup.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('/signup')
//   signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
//     return this.authService.signUp(signUpDto);
//   }

//   @Get('/login')
//   login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
//     return this.authService.login(loginDto);
//   }
// }

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

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

  @Post('/login') // Change to POST
  @ApiBody({ type: LoginDto }) // Define the body
  @ApiResponse({ status: 200, description: 'Successful login', schema: {
    type: 'object',
    properties: {
      token: { type: 'string', description: 'Authentication token' },
    },
  }})
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
