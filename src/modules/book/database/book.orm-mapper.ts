import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { BookEntity, BookProps } from '../domain/entities/book.entity';
import { Author } from '../domain/value-objects/author.value-object';
import { ISBN } from '../domain/value-objects/isbn.value-object';
import { BookOrmEntity } from './book.orm-entity';

export class BookOrmMapper extends OrmMapper<BookEntity, BookOrmEntity> {
  protected toOrmProps(entity: BookEntity): OrmEntityProps<BookOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<BookOrmEntity> = {
      isbn10: props.isbn.isbn10,
      isbn13: props.isbn.isbn13,
      title: props.title,
      subtitle: props.subtitle,
      originalTitle: props.originTitle,
      author: props.author,
      publisher: props.publisher,
      publishedDate: props.publishedDate,
      image: props.image,
      pageCount: props.pages,
      summary: props.summary,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: BookOrmEntity): BookProps {
    const props: BookProps = {
      isbn: new ISBN({ isbn10: ormEntity.isbn10, isbn13: ormEntity.isbn13 }),
      title: ormEntity.title,
      subtitle: ormEntity.subtitle,
      originTitle: ormEntity.originalTitle,
      author: new Author({
        firstName: ormEntity.author.firstName,
        lastName: ormEntity.author.lastName,
      }),
      publisher: ormEntity.publisher,
      publishedDate: ormEntity.publishedDate,
      image: ormEntity.image,
      pages: ormEntity.pageCount,
      summary: ormEntity.summary,
    };

    return props;
  }
}
