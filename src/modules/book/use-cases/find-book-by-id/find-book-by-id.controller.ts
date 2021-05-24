import { routes } from '@config/app.routes';
import { BookRepository } from '@modules/book/database/book.repository';
import { BookResponse } from '@modules/book/dtos/book.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Id } from 'src/interface-adapters/interfaces/id.interface';

@Controller()
export class FindBookByIdHttpcontroller {
  constructor(private readonly bookRepo: BookRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.book.book)
  async findBooks(@Param() param: Id): Promise<BookResponse> {
    const book = await this.bookRepo.findBookById(param.id);
    return new BookResponse(book);
  }
}
