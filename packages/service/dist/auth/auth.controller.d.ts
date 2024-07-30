import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { AssignRoleDto } from './dto/assign-role.dto';
import { User } from './schemas/user.schema';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAllUsers(): Promise<any[]>;
    getProfile(req: any): Promise<User | null>;
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    forgottenPassword(body: ForgottenPasswordDto, req: Request): Promise<string>;
    resetPassword(body: ResetPasswordDto): Promise<{
        token: string;
        user: any;
    }>;
    assignRole(userId: string, assignRoleDto: AssignRoleDto): Promise<void>;
    deleteUser(id: string, req: Request): Promise<void>;
    getBookCount(): Promise<{
        count: number;
    }>;
}
