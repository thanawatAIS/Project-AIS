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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const book_schema_1 = require("./schemas/book.schema");
let BookService = class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async findAll(query) {
        const resPerPage = 999999;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        const keywordFilter = query.keyword
            ? { title: { $regex: query.keyword, $options: 'i' } }
            : {};
        const titleFilter = query.title
            ? { title: { $regex: query.title, $options: 'i' } }
            : {};
        const authorFilter = query.author
            ? { author: { $regex: query.author, $options: 'i' } }
            : {};
        const categoryFilter = query.category
            ? { category: { $regex: query.category, $options: 'i' } }
            : {};
        const filters = {
            ...keywordFilter,
            ...titleFilter,
            ...authorFilter,
            ...categoryFilter,
        };
        const books = await this.bookModel
            .find({ ...filters })
            .limit(resPerPage)
            .skip(skip);
        return books;
    }
    async create(book, user) {
        try {
            return await this.bookModel.create(book);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create book');
        }
    }
    async findById(id) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new common_1.NotFoundException('Book not found.');
        }
        return book;
    }
    async updateById(id, updateBookDto) {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true, runValidators: true }).exec();
        return updatedBook;
    }
    async deleteById(id) {
        return await this.bookModel.findByIdAndDelete(id);
    }
    async getTotalBookCount() {
        try {
            return await this.bookModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to get book count');
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], BookService);
//# sourceMappingURL=book.service.js.map