import { AuthorRepository } from '@modules/book/database/author/author.repository';
import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ImageRepositoryPort } from '@modules/book/database/image/image.repository.interface';
import { FileUplaodService } from '@modules/book/domain-services/file-upload.service';
import { AuthorEntity } from '@modules/book/domain/entities/author.entity';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { ImageEntity } from '@modules/book/domain/entities/image.entity';
import { ConflictException } from '@nestjs/common';
import { ID } from 'src/core/value-objects/id.value-object';
import { CreateAuthorsCommand } from './create-author.command';
import { CreateBookCommand } from './create-book.command';
import { CreateImageCommand } from './create-image.command';

export class CreateBookService {
  constructor(
    private readonly bookRepo: BookRepositoryPort,
    private readonly imageService: FileUplaodService,
    private readonly imageRepo: ImageRepositoryPort,
    private readonly authorRepo: AuthorRepository,
  ) {}

  async createBook(
    bookCommand: CreateBookCommand,
    authorCommand: CreateAuthorsCommand,
    imageCommand: CreateImageCommand,
  ): Promise<ID> {
    if (await this.bookRepo.existsByISBN(bookCommand.isbn.value)) {
      throw new ConflictException('Book already exists');
    }

    const authors = authorCommand.authors.map(
      (author) => new AuthorEntity(author),
    );

    const image = new ImageEntity(imageCommand);

    const imageDescription = {
      imageName: imageCommand.imageName,
      imageType: imageCommand.imageType,
      imageSize: imageCommand.imageSize,
    };
    this.imageService.upload(imageCommand.storedImage, imageDescription);

    await this.imageRepo.save(image);

    await this.authorRepo.saveMultiple(authors);

    const book = new BookEntity({ ...bookCommand, authors, image });

    const created = await this.bookRepo.save(book);

    return created.id;
  }
}
