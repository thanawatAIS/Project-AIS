import {
  Controller,
  Delete,
  Post,
  Body,
  Param,
  Req,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { getOriginHeader } from './utils/getOriginHeader';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/roles.enum';
import { AssignRoleDto } from './dto/assign-role.dto';
import { User } from './schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/users')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' },
        },
      },
    },
  })
  async getAllUsers(): Promise<any[]> {
    return this.authService.getAllUsers();
  }

  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Returns the profile of the authenticated user',
  })
  async getProfile(@Req() req): Promise<User | null> {
    const userId = req.user.id;
    return this.authService.getProfile(userId);
  }

  @Post('/signup')
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'Authentication token' },
      },
    },
  })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('forgotten-password')
  @ApiBody({ type: ForgottenPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgottenPassword(
    @Body() body: ForgottenPasswordDto,
    @Req() req: Request,
  ): Promise<string> {
    const resetToken = await this.authService.forgottenPassword(
      body,
      getOriginHeader(req),
    );
    return resetToken;
  }

  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'Authentication token' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  })
  resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<{ token: string; user: any }> {
    return this.authService.resetPassword(body);
  }

  @Post('/assign-role/:id')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async assignRole(
    @Param('id') userId: string,
    @Body() assignRoleDto: AssignRoleDto,
  ): Promise<void> {
    await this.authService.assignRole(userId, assignRoleDto);
  }

  // @Delete('delete/:id')
  // // @ApiBearerAuth()
  // // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // // @Roles(Role.Admin)
  // @ApiResponse({ status: 200, description: 'Delete a user' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // async deleteUser(
  //   @Param('id') id: string,
  //   @Req() req: Request,
  // ): Promise<void> {
  //   const requestingUserId = req.user['id'];
  //   console.log(`Requesting user ID: ${requestingUserId}`);

  //   try {
  //     await this.authService.deleteUserById(id, requestingUserId);
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     throw error;
  //   }
  // }

  @Delete('delete/:id')
  // @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Delete a user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const requestingUserId = req.user?.['id'] ;
    try {
      await this.authService.deleteUserById(id, requestingUserId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  @Get('count')
  async getBookCount(): Promise<{ count: number }> {
    const count = await this.authService.getTotalUserCount();
    return { count };
  }

}
