import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    forgottenPassword(forgottenPasswordDto: ForgottenPasswordDto, origin: string): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        token: string;
        user: any;
    }>;
    deleteUserById(id: string, requestingUserId: string): Promise<void>;
    private getPublicData;
}
