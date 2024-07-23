import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from './roles/roles.enum';
import { AssignRoleDto } from './dto/assign-role.dto';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async getAllUsers(): Promise<any[]> {
    const users = await this.userModel.find().select('-password'); // Exclude password field
    return users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }

  async getProfile(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role: Role.User, // Adjust as necessary
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }

  // async login(loginDto: LoginDto): Promise<{ token: string }> {
  //   const { email, password } = loginDto;

  //   const user = await this.userModel.findOne({ email });

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const isPasswordMatched = await bcrypt.compare(password, user.password);

  //   if (!isPasswordMatched) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const token = this.jwtService.sign({ id: user._id, role: user.role });

  //   return { token };
  // }

  async login(loginDto: LoginDto): Promise<{ token: string; user: User }> {
    const { email, password } = loginDto;
  
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const token = this.jwtService.sign({ id: user._id, role: user.role });
  
    return { token, user };
  }

  async forgottenPassword(
    forgottenPasswordDto: ForgottenPasswordDto,
    origin: string,
  ): Promise<string> {
    const { email } = forgottenPasswordDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );

    // Log the reset token to terminal
    console.log(`Reset token for ${email}: ${resetToken}`);

    // Send email with reset token
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Use the following token to reset your password: ${resetToken}`,
    };

    await this.transporter.sendMail(mailOptions);

    return resetToken;
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ token: string; user: any }> {
    const { email, passwordResetToken, password } = resetPasswordDto;

    try {
      const payload = this.jwtService.verify(passwordResetToken);
      if (payload.email !== email) {
        throw new BadRequestException('Invalid token');
      }
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token, user: this.getPublicData(user) };
  }

  async deleteUserById(id: string, requestingUserId: string): Promise<void> {
    const userToDelete = await this.userModel.findById(id);

    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (
      requestingUserId !== userToDelete.id &&
      userToDelete.role !== Role.User
    ) {
      throw new ForbiddenException(
        'You are not authorized to delete this user',
      );
    }

    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // async assignRole(
  //   userId: string,
  //   assignRoleDto: AssignRoleDto,
  // ): Promise<void> {
  //   const { role } = assignRoleDto;

  //   const user = await this.userModel.findById(userId);

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${userId} not found`);
  //   }

  //   user.role = role;

  //   await user.save();
  // }

  async assignRole(userId: string, assignRoleDto: AssignRoleDto): Promise<void> {
    const { role } = assignRoleDto;
  
    try {
      const user = await this.userModel.findById(userId);
  
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      user.role = role; // Update the role
      await user.save();
    } catch (error) {
      // Log the error or handle it accordingly
      console.error('Error assigning role:', error);
      throw new InternalServerErrorException('Failed to assign role');
    }
  }
  

  private getPublicData(user: User): any {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}
