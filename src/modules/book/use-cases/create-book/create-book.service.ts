import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { FileUploadService } from '@modules/book/domain-services/file-upload.service';
import { AuthorEntity } from '@modules/book/domain/entities/author.entity';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { ImageEntity } from '@modules/book/domain/entities/image.entity';
import { ConflictException } from '@nestjs/common';
import { ID } from 'src/core/value-objects/id.value-object';
import { CreateBookCommand } from './create-book.command';

export class CreateBookService {
  constructor(
    private readonly bookRepo: BookRepositoryPort,
    private readonly imageService: FileUploadService,
  ) {}

  async createBook(bookCommand: CreateBookCommand): Promise<ID> {
    if (await this.bookRepo.existsByISBN(bookCommand.isbn.value)) {
      throw new ConflictException('Book already exists');
    }
    const { authors, image, ...book } = bookCommand;

    const fileName = this.imageService.upload(image);

    const bookEntity = new BookEntity({
      ...book,
      authors: authors.map((author) => new AuthorEntity(author)),
      image: new ImageEntity({
        name: fileName,
        mimeType: image.mimetype,
        size: image.size,
      }),
    });

    const created = await this.bookRepo.save(bookEntity);

    return created.id;
  }
}
