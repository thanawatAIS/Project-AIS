"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("./roles/roles.enum");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { name, email, password } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            role: roles_enum_1.Role.User,
        });
        const token = this.jwtService.sign({ id: user._id, role: user.role });
        return { token };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({ id: user._id, role: user.role });
        return { token };
    }
    async forgottenPassword(forgottenPasswordDto, origin) {
        const { email } = forgottenPasswordDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
        console.log(`Reset token for ${email}: ${resetToken}`);
    }
    async resetPassword(resetPasswordDto) {
        const { email, passwordResetToken, password } = resetPasswordDto;
        try {
            const payload = this.jwtService.verify(passwordResetToken);
            if (payload.email !== email) {
                throw new common_1.BadRequestException('Invalid token');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        const token = this.jwtService.sign({ id: user._id, role: user.role });
        return {
            token,
            user: this.getPublicData(user),
        };
    }
    async deleteUserById(id, requestingUserId) {
        const userToDelete = await this.userModel.findById(id);
        if (!userToDelete) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (requestingUserId !== userToDelete.id && userToDelete.role !== roles_enum_1.Role.User) {
            throw new common_1.ForbiddenException('You are not authorized to delete this user');
        }
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
    }
    getPublicData(user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map