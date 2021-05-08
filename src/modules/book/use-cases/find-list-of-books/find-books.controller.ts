import { Controller, Get, UseGuards } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { BooksResponse } from '@modules/book/dtos/books.response.dto';
import { BookRepository } from '@modules/book/database/book.repository';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { BookResponse } from '@modules/book/dtos/book.response.dts';

@Controller()
export class FindBooksHttpController {
  constructor(private readonly bookRepo: BookRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.book.books)
  async findBooks(): Promise<BooksResponse> {
    const books = await this.bookRepo.findMany();
    const booksResponse = books.map((book) => new BookResponse(book));
    return new BooksResponse(booksResponse);
  }
}
