import { Provider } from '@nestjs/common';
import { ImageUploadService } from 'src/infrastructure/services/image-upload.service';
import { BookRepository } from './database/book.repository';
import { CreateBookService } from './use-cases/create-book/create-book.service';

export const createBookSymbol = Symbol('createBook');

export const createBookProvider: Provider = {
  provide: createBookSymbol,
  useFactory: (
    bookRepository: BookRepository,
    imageSerivce: ImageUploadService,
  ): CreateBookService => new CreateBookService(bookRepository, imageSerivce),
  inject: [BookRepository, ImageUploadService],
};
