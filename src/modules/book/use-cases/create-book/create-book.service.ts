import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { ConflictException } from '@nestjs/common';
import { CreateBookCommand } from './create-book.command';

export class CreateBookService {
  constructor(private readonly bookRepo: BookRepositoryPort) {}

  async createBook(command: CreateBookCommand): Promise<BookEntity> {
    // existsByISBN should have two parameters: isbn10 and isbn13
    if (await this.bookRepo.existsByISBN(command.isbn.isbn10)) {
      throw new ConflictException('Book already exists');
    }
    const book = new BookEntity(command);

    const created = await this.bookRepo.save(book);

    return created;
  }
}
