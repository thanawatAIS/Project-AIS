import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async forgottenPassword(forgottenPasswordDto: ForgottenPasswordDto, origin: string): Promise<void> {
    const { email } = forgottenPasswordDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
    // Send resetToken to the user's email.
    console.log(`Reset token for ${email}: ${resetToken}`);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ token: string; user: any }> {
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

    const token = this.jwtService.sign({ id: user._id });

    return {
      token,
      user: this.getPublicData(user),
    };
  }

  private getPublicData(user: User): any {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
  async deleteUserById(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
