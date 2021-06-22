import { Provider } from '@nestjs/common';
import { ImageUploadService } from 'src/infrastructure/services/image-upload.service';
import { BookRepository } from './database/book.repository';
import { CreateBookService } from './use-cases/create-book/create-book.service';
import { FindRecentBooksService } from './use-cases/find-recent-books/find-recent-books.service';

export const createBookSymbol = Symbol('createBook');

export const createBookProvider: Provider = {
  provide: createBookSymbol,
  useFactory: (
    bookRepository: BookRepository,
    imageService: ImageUploadService,
  ): CreateBookService => new CreateBookService(bookRepository, imageService),
  inject: [BookRepository, ImageUploadService],
};

export const findRecentBooksSymbol = Symbol('findRecentBooks');

export const findRecentBooksProvider: Provider = {
  provide: findRecentBooksSymbol,
  useFactory: (bookRepository: BookRepository): FindRecentBooksService =>
    new FindRecentBooksService(bookRepository),
  inject: [BookRepository],
};
