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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const book_schema_1 = require("./schemas/book.schema");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles/roles.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const roles_enum_1 = require("../auth/roles/roles.enum");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooksWithoutFilters() {
        return this.bookService.findAll({});
    }
    async getAllBooks(title, author, category, query) {
        const filter = {};
        if (title)
            filter.title = title;
        if (author)
            filter.author = author;
        if (category)
            filter.category = category;
        return this.bookService.findAll({ ...filter, ...query });
    }
    async getBook(id) {
        return this.bookService.findById(id);
    }
    async createBook(book, req) {
        try {
            return await this.bookService.create(book, req.user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create book');
        }
    }
    async updateBook(id, book) {
        return this.bookService.updateById(id, book);
    }
    async deleteBook(id) {
        return this.bookService.deleteById(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all books without any filters',
        type: [book_schema_1.Book],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooksWithoutFilters", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get books with optional filters',
        type: [book_schema_1.Book],
    }),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('author')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('search:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get a book by ID', type: book_schema_1.Book }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBook", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Create a book', type: book_schema_1.Book }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBook", null);
__decorate([
    (0, common_1.Put)('update:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update a book', type: book_schema_1.Book }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)('delete:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delete a book' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('books'),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map