import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    private transporter;
    getAllUsers(): Promise<any[]>;
    getProfile(userId: string): Promise<User | null>;
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: User;
    }>;
    forgottenPassword(forgottenPasswordDto: ForgottenPasswordDto, origin: string): Promise<string>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        token: string;
        user: any;
    }>;
    deleteUserById(id: string, requestingUserId: string): Promise<void>;
    assignRole(userId: string, assignRoleDto: AssignRoleDto): Promise<void>;
    private getPublicData;
}
