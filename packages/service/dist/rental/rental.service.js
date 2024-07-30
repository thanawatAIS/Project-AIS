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
exports.RentalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rental_schema_1 = require("./schemas/rental.schema");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
let RentalService = class RentalService {
    constructor(rentalModel) {
        this.rentalModel = rentalModel;
    }
    async findAll() {
        return this.rentalModel.find().exec();
    }
    async create(rentalDto, user) {
        const createdRental = new this.rentalModel({
            ...rentalDto,
            user: user._id,
        });
        return createdRental.save();
    }
    async findById(id) {
        const rental = await this.rentalModel.findById(id).exec();
        if (!rental) {
            throw new common_2.NotFoundException(`Rental with ID ${id} not found`);
        }
        return rental;
    }
    async updateRent(id, rentalDto) {
        return this.rentalModel.findByIdAndUpdate(id, {
            ...rentalDto,
            rentDate: new Date().toISOString(),
            $push: { rentHistory: { date: new Date(), user: rentalDto.user } },
        }, { new: true });
    }
    async updateReturn(id, rentalDto) {
        return this.rentalModel.findByIdAndUpdate(id, {
            ...rentalDto,
            returnDate: new Date().toISOString(),
            $push: { returnHistory: { date: new Date(), user: rentalDto.user } },
        }, { new: true });
    }
    async deleteById(id) {
        return this.rentalModel.findByIdAndDelete(id);
    }
    async getTotalRentalCount() {
        try {
            return await this.rentalModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_3.InternalServerErrorException('Failed to get rental count');
        }
    }
};
exports.RentalService = RentalService;
exports.RentalService = RentalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rental_schema_1.Rental.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RentalService);
//# sourceMappingURL=rental.service.js.map