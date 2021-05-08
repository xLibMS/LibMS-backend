import { Provider } from '@nestjs/common';
import { ImageUploadService } from 'src/infrastructure/services/image-upload.service';
import { AuthorRepository } from './database/author/author.repository';
import { BookRepository } from './database/book.repository';
import { ImageRepository } from './database/image/image.repository';
import { CreateBookService } from './use-cases/create-book/create-book.service';

export const createBookSymbol = Symbol('createBook');

export const createBookProvider: Provider = {
  provide: createBookSymbol,
  useFactory: (
    bookRepository: BookRepository,
    imageSerivce: ImageUploadService,
    imageRepository: ImageRepository,
    authorRepository: AuthorRepository,
  ): CreateBookService =>
    new CreateBookService(
      bookRepository,
      imageSerivce,
      imageRepository,
      authorRepository,
    ),
  inject: [
    BookRepository,
    ImageUploadService,
    ImageRepository,
    AuthorRepository,
  ],
};
