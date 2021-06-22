import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { BookEntity } from '@modules/book/domain/entities/book.entity';

export class FindRecentBooksService {
  constructor(private readonly bookRepo: BookRepositoryPort) {}

  async getRecentBooks(limit: number): Promise<BookEntity[]> {
    const recentBooks = await this.bookRepo.findRecent(limit);

    return recentBooks;
  }
}
