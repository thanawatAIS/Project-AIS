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
exports.RentalController = void 0;
const common_1 = require("@nestjs/common");
const rental_service_1 = require("./rental.service");
const create_rental_dto_1 = require("./dto/create-rental.dto");
const update_rental_dto_1 = require("./dto/update-rental.dto");
const rental_schema_1 = require("./schemas/rental.schema");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles/roles.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const roles_enum_1 = require("../auth/roles/roles.enum");
let RentalController = class RentalController {
    constructor(rentalService) {
        this.rentalService = rentalService;
    }
    async getAllRentals() {
        return this.rentalService.findAll();
    }
    async getRentalById(id) {
        return this.rentalService.findById(id);
    }
    async createRental(rental, req) {
        return this.rentalService.create(rental, req.user);
    }
    async updateRent(id, rental) {
        return this.rentalService.updateRent(id, rental);
    }
    async updateReturn(id, rental) {
        return this.rentalService.updateReturn(id, rental);
    }
    async deleteRental(id) {
        return this.rentalService.deleteById(id);
    }
};
exports.RentalController = RentalController;
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all rentals',
        type: [rental_schema_1.Rental],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getAllRentals", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get a rental by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getRentalById", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create a rental',
        type: rental_schema_1.Rental,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rental_dto_1.CreateRentalDto, Object]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "createRental", null);
__decorate([
    (0, common_1.Put)('rent/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update rent details',
        type: rental_schema_1.Rental,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rental_dto_1.UpdateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "updateRent", null);
__decorate([
    (0, common_1.Put)('return/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update return details',
        type: rental_schema_1.Rental,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rental_dto_1.UpdateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "updateReturn", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delete a rental' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "deleteRental", null);
exports.RentalController = RentalController = __decorate([
    (0, swagger_1.ApiTags)('rental'),
    (0, common_1.Controller)('rental'),
    __metadata("design:paramtypes", [rental_service_1.RentalService])
], RentalController);
//# sourceMappingURL=rental.controller.js.map