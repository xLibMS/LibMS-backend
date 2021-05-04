import { Controller, Get, UseGuards } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { BooksResponse } from '@modules/book/dtos/books.response.dto';
import { BookRepository } from '@modules/book/database/book.repository';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';

@Controller()
export class FindBooksHttpController {
  constructor(private readonly bookRepo: BookRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.book.books)
  async findBooks(): Promise<BooksResponse> {
    const books = await this.bookRepo.findMany();
    return new BooksResponse(books);
  }
}
