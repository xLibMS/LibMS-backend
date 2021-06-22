import { routes } from '@config/app.routes';
import { findRecentBooksSymbol } from '@modules/book/book.provider';
import { BookResponse } from '@modules/book/dtos/book.response.dto';
import { BooksResponse } from '@modules/book/dtos/books.response.dto';
import { Controller, Get, Inject } from '@nestjs/common';
import { FindRecentBooksService } from './find-recent-books.service';

@Controller()
export class FindRecentBooksHttpController {
  constructor(
    @Inject(findRecentBooksSymbol)
    private readonly findRecentBooksService: FindRecentBooksService,
  ) {}

  @Get(routes.book.recent)
  async getRecentBooks(): Promise<BooksResponse> {
    const books = await this.findRecentBooksService.getRecentBooks(5);
    const booksResponse = books.map((book) => new BookResponse(book));
    return new BooksResponse(booksResponse);
  }
}
