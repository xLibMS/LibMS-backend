/* eslint-disable @typescript-eslint/no-empty-interface */
import { RepositoryPort } from 'src/core/ports/repository.ports';
import { BookEntity, BookProps } from '../domain/entities/book.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface BookRepositoryPort
  extends RepositoryPort<BookEntity, BookProps> {
  findOneByISBNOrThrow(isbn: string): Promise<BookEntity>;
  existsByISBN(isbn: string): Promise<boolean>;
  findBookById(id: string): Promise<BookEntity>;
}
