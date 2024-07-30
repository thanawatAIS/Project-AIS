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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const forgotten_password_dto_1 = require("./dto/forgotten-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const passport_1 = require("@nestjs/passport");
const common_2 = require("@nestjs/common");
const getOriginHeader_1 = require("./utils/getOriginHeader");
const roles_decorator_1 = require("./roles/roles.decorator");
const roles_enum_1 = require("./roles/roles.enum");
const assign_role_dto_1 = require("./dto/assign-role.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getAllUsers() {
        return this.authService.getAllUsers();
    }
    async getProfile(req) {
        const userId = req.user.id;
        return this.authService.getProfile(userId);
    }
    signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    async forgottenPassword(body, req) {
        const resetToken = await this.authService.forgottenPassword(body, (0, getOriginHeader_1.getOriginHeader)(req));
        return resetToken;
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    async assignRole(userId, assignRoleDto) {
        await this.authService.assignRole(userId, assignRoleDto);
    }
    async deleteUser(id, req) {
        const requestingUserId = req.user?.['id'];
        try {
            await this.authService.deleteUserById(id, requestingUserId);
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
    async getBookCount() {
        const count = await this.authService.getTotalUserCount();
        return { count };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('/users'),
    (0, swagger_1.ApiResponse)({
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the profile of the authenticated user',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiBody)({ type: signup_dto_1.SignUpDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully signed up.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successful login',
        schema: {
            type: 'object',
            properties: {
                token: { type: 'string', description: 'Authentication token' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forgotten-password'),
    (0, swagger_1.ApiBody)({ type: forgotten_password_dto_1.ForgottenPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset email sent' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgotten_password_dto_1.ForgottenPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgottenPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/assign-role/:id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_role_dto_1.AssignRoleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delete a user' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getBookCount", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map