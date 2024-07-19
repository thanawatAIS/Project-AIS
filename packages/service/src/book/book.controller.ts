import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('all')
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get all books without any filters',
    type: [Book],
  })
  async getAllBooksWithoutFilters(): Promise<Book[]> {
    return this.bookService.findAll({});
  }

  @Get('search')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get books with optional filters',
    type: [Book],
  })
  async getAllBooks(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('category') category?: string,
    @Query() query?: ExpressQuery,
  ): Promise<Book[]> {
    const filter: any = {};
    if (title) filter.title = title;
    if (author) filter.author = author;
    if (category) filter.category = category;
    return this.bookService.findAll({ ...filter, ...query });
  }

  @Get('search:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get a book by ID', type: Book })
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'Create a book', type: Book })
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Put('update:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Update a book', type: Book })
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete('delete:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Delete a book' })
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
