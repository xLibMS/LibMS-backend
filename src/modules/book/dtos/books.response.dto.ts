import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { BookEntity } from '../domain/entities/book.entity';

export class BooksResponse {
  constructor(books: BookEntity[]) {
    this.books = books;
  }

  @ApiProperty({
    example: [],
  })
  @IsArray()
  books: BookEntity[];
}
