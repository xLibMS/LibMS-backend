import { NotFoundException } from '@exceptions';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import { BookEntity, BookProps } from '../domain/entities/book.entity';
import { BookOrmEntity } from './book.orm-entity';
import { BookOrmMapper } from './book.orm-mapper';
import { BookRepositoryPort } from './book.repository.interface';

@Injectable()
export class BookRepository
  extends TypeormRepositoryBase<BookEntity, BookProps, BookOrmEntity>
  implements BookRepositoryPort
{
  protected relations: string[] = ['authors', 'image'];

  constructor(
    @InjectRepository(BookOrmEntity)
    private readonly bookRepository: Repository<BookOrmEntity>,
  ) {
    super(
      bookRepository,
      new BookOrmMapper(BookEntity, BookOrmEntity),
      new Logger('book-repository'),
    );
  }

  private async findOneByISBN(
    isbn: string,
  ): Promise<BookOrmEntity | undefined> {
    const book = await this.bookRepository.findOne({
      where: { isbn },
      relations: this.relations,
    });

    return book;
  }

  async findOneByISBNOrThrow(isbn: string): Promise<BookEntity> {
    const book = await this.findOneByISBN(isbn);
    if (!book) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(book);
  }

  async existsByISBN(isbn: string): Promise<boolean> {
    const found = await this.findOneByISBN(isbn);
    if (found) {
      return true;
    }
    return false;
  }

  protected prepareQuery(
    params: QueryParams<BookProps>,
  ): WhereCondition<BookOrmEntity> {
    const where: QueryParams<BookOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}
