import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { AssignRoleDto } from './dto/assign-role.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAllUsers(): Promise<any[]>;
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    forgottenPassword(body: ForgottenPasswordDto, req: Request): Promise<void>;
    resetPassword(body: ResetPasswordDto): Promise<{
        token: string;
        user: any;
    }>;
    deleteUser(id: string, req: Request): Promise<void>;
    assignRole(userId: string, assignRoleDto: AssignRoleDto): Promise<void>;
}
