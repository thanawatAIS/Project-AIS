import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookService {
    private bookModel;
    constructor(bookModel: mongoose.Model<Book>);
    findAll(query: Query): Promise<Book[]>;
    create(book: CreateBookDto, user?: any): Promise<Book>;
    findById(id: string): Promise<Book>;
    updateById(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteById(id: string): Promise<Book>;
    getTotalBookCount(): Promise<number>;
}
