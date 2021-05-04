import { Controller, Get, UseGuards } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { ListOfBooksResponse } from '@modules/book/dtos/list-of-books.response.dto';
import { BookRepository } from '@modules/book/database/book.repository';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';

@Controller()
export class FindListOfBooksHttpController {
  constructor(private readonly bookRepo: BookRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.book.list)
  async findListOfBooks(): Promise<ListOfBooksResponse> {
    const books = await this.bookRepo.findAllBooks();
    return new ListOfBooksResponse(books);
  }
}
