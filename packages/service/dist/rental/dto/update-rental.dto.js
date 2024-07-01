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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRentalDto = void 0;
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../../auth/schemas/user.schema");
const swagger_1 = require("@nestjs/swagger");
class UpdateRentalDto {
}
exports.UpdateRentalDto = UpdateRentalDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID cannot be empty' }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '667e2acb3b4af0a9f6f1bd30', description: 'User ID' }),
    __metadata("design:type", user_schema_1.User)
], UpdateRentalDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRentalDto.prototype, "bookID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '2024-07-01', description: 'Rent Date' }),
    __metadata("design:type", String)
], UpdateRentalDto.prototype, "rentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '2024-07-10', description: 'Return Date' }),
    __metadata("design:type", String)
], UpdateRentalDto.prototype, "returnDate", void 0);
//# sourceMappingURL=update-rental.dto.js.map