import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { BookEntity } from '../domain/entities/book.entity';

export class ListOfBooksResponse {
  constructor(listOfBooks: BookEntity[]) {
    this.listOfBooks = listOfBooks;
  }

  @ApiProperty({
    example: [],
  })
  @IsArray()
  listOfBooks: BookEntity[];
}
