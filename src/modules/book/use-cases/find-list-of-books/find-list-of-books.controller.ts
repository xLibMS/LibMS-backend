import { Controller, Get } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { ListOfBooksResponse } from '@modules/book/dtos/list-of-books.response.dto';
import { BookRepository } from '@modules/book/database/book.repository';

@Controller()
export class FindListOfBooksHttpController {
  constructor(private readonly bookRepo: BookRepository) {}

  @Get(routes.book.list)
  async findByEmail(): Promise<ListOfBooksResponse> {
    const user = await this.bookRepo.findAllBooks();
    return new ListOfBooksResponse(user);
  }
}
