import { Provider } from '@nestjs/common';
import { BookRepository } from './database/book.repository';
import { CreateBookService } from './use-cases/create-book/create-book.service';

export const createBookSymbol = Symbol('createBook');

export const createBookProvider: Provider = {
  provide: createBookSymbol,
  useFactory: (bookRepository: BookRepository): CreateBookService =>
    new CreateBookService(bookRepository),
  inject: [BookRepository],
};
