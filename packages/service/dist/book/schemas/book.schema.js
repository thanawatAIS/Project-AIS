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
exports.BookSchema = exports.Book = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../auth/schemas/user.schema");
const date_fns_1 = require("date-fns");
const mongoose_3 = require("mongoose");
var Category;
(function (Category) {
    Category["ADVENTURE"] = "Adventure";
    Category["CLASSICS"] = "Classics";
    Category["CRIME"] = "Crime";
    Category["FANTASY"] = "Fantasy";
    Category["HORROR"] = "Horror";
    Category["ROMANCE"] = "Romance";
    Category["COMEDY"] = "Comedy";
    Category["FOOD"] = "Food";
    Category["HISTORY"] = "History";
    Category["BIOGRAPHY"] = "Biography";
    Category["SCIENCE"] = "Science";
    Category["SELF_HELP"] = "Self Help";
    Category["THRILLER"] = "Thriller";
    Category["MYSTERY"] = "Mystery";
    Category["CHILDREN"] = "Children";
    Category["SCIENCE_FICTION"] = "Science Fiction";
    Category["POETRY"] = "Poetry";
    Category["DRAMA"] = "Drama";
    Category["RELIGION"] = "Religion";
})(Category || (exports.Category = Category = {}));
let Book = class Book extends mongoose_3.Document {
};
exports.Book = Book;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Category }),
    __metadata("design:type", String)
], Book.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Book.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        set: (val) => (0, date_fns_1.format)(val, 'yyyy-MM-dd')
    }),
    __metadata("design:type", String)
], Book.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        set: (val) => (0, date_fns_1.format)(val, 'yyyy-MM-dd')
    }),
    __metadata("design:type", String)
], Book.prototype, "updatedAt", void 0);
exports.Book = Book = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Book);
exports.BookSchema = mongoose_1.SchemaFactory.createForClass(Book);
exports.BookSchema.pre('save', function (next) {
    const now = new Date();
    const formattedDate = (0, date_fns_1.format)(now, 'yyyy-MM-dd');
    if (!this.createdAt) {
        this.createdAt = formattedDate;
    }
    this.updatedAt = formattedDate;
    next();
});
exports.BookSchema.pre('findOneAndUpdate', function (next) {
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
exports.BookSchema.pre('updateOne', function (next) {
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
//# sourceMappingURL=book.schema.js.map