import { ApiProperty } from '@nestjs/swagger';
import { BookResponse } from './book.response.dto';

export class BooksResponse {
  constructor(books: BookResponse[]) {
    this.books = books;
  }

  @ApiProperty({
    example: [],
  })
  books: BookResponse[];
}
