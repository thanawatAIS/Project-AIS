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
exports.CreateRentalDto = void 0;
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../../auth/schemas/user.schema");
const swagger_1 = require("@nestjs/swagger");
class CreateRentalDto {
}
exports.CreateRentalDto = CreateRentalDto;
__decorate([
    (0, class_validator_1.IsEmpty)({ message: 'You cannot pass user id' }),
    __metadata("design:type", user_schema_1.User)
], CreateRentalDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '667a83085c32b809ab7152dc', description: 'ID of the book' }),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "bookID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '-', description: 'Rent Date' }),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "rentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '-', description: 'Return Date' }),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "returnDate", void 0);
//# sourceMappingURL=create-rental.dto.js.map