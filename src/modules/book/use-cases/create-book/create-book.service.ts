import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { ConflictException } from '@nestjs/common';
import { ID } from 'src/core/value-objects/id.value-object';
import { CreateBookCommand } from './create-book.command';

export class CreateBookService {
  constructor(private readonly bookRepo: BookRepositoryPort) {}

  async createBook(command: CreateBookCommand): Promise<ID> {
    if (await this.bookRepo.existsByISBN(command.isbn.isbn13)) {
      throw new ConflictException('Book already exists');
    }
    if (command.isbn.isbn10) {
      if (await this.bookRepo.existsByISBN(command.isbn.isbn10)) {
        throw new ConflictException('Book already exists');
      }
    }
    const book = new BookEntity(command);

    const created = await this.bookRepo.save(book);

    return created.id;
  }
}
