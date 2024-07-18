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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const roles_enum_1 = require("../roles/roles.enum");
const date_fns_1 = require("date-fns");
let User = class User extends mongoose_2.Document {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: [true, 'Duplicate email entered'] }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: roles_enum_1.Role, default: roles_enum_1.Role.User }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        set: (val) => (0, date_fns_1.format)(val, 'yyyy-MM-dd')
    }),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        set: (val) => (0, date_fns_1.format)(val, 'yyyy-MM-dd')
    }),
    __metadata("design:type", String)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', function (next) {
    const now = new Date();
    const formattedDate = (0, date_fns_1.format)(now, 'yyyy-MM-dd');
    if (!this.createdAt) {
        this.createdAt = formattedDate;
    }
    this.updatedAt = formattedDate;
    next();
});
exports.UserSchema.pre('findOneAndUpdate', function (next) {
    const now = new Date();
    const formattedDate = (0, date_fns_1.format)(now, 'yyyy-MM-dd');
    const update = this.getUpdate();
    if (update) {
        if (update.$set) {
            update.$set.updatedAt = formattedDate;
        }
        else {
            update.updatedAt = formattedDate;
        }
    }
    next();
});
exports.UserSchema.pre('updateOne', function (next) {
    const now = new Date();
    const formattedDate = (0, date_fns_1.format)(now, 'yyyy-MM-dd');
    const update = this.getUpdate();
    if (update) {
        if (update.$set) {
            update.$set.updatedAt = formattedDate;
        }
        else {
            update.updatedAt = formattedDate;
        }
    }
    next();
});
//# sourceMappingURL=user.schema.js.map