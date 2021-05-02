import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { FileUplaodService } from '@modules/book/domain-services/file-upload.service';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { ConflictException } from '@nestjs/common';
import { ID } from 'src/core/value-objects/id.value-object';
import { CreateBookCommand } from './create-book.command';

export class CreateBookService {
  constructor(
    private readonly bookRepo: BookRepositoryPort,
    private readonly imageService: FileUplaodService,
  ) {}

  async createBook(command: CreateBookCommand): Promise<ID> {
    if (await this.bookRepo.existsByISBN(command.isbn.value)) {
      throw new ConflictException('Book already exists');
    }

    const book = new BookEntity(command);

    this.imageService.upload(command.storedImage, command.image);

    const created = await this.bookRepo.save(book);

    return created.id;
  }
}
