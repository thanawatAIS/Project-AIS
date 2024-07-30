import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
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

  async create(book: CreateBookDto, user?: any): Promise<Book> {
    try {
      return await this.bookModel.create(book);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async updateById(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      updateBookDto,
      { new: true, runValidators: true }
    ).exec();
    
    return updatedBook;
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async getTotalBookCount(): Promise<number> {
    try {
      return await this.bookModel.countDocuments().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get book count');
    }
  }
}
