import { routes } from '@config/app.routes';
import { BookRepository } from '@modules/book/database/book.repository';
import { BookResponse } from '@modules/book/dtos/book.response.dto';
import { BooksResponse } from '@modules/book/dtos/books.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

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
