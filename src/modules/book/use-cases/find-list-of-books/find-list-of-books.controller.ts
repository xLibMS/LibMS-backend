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
  async findByEmail(): Promise<ListOfBooksResponse> {
    const user = await this.bookRepo.findAllBooks();
    return new ListOfBooksResponse(user);
  }
}
