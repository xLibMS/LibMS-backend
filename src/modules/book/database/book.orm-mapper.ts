import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { BookEntity, BookProps } from '../domain/entities/book.entity';
import { Author } from '../domain/value-objects/author.value-object';
import { ISBN } from '../domain/value-objects/isbn.value-object';
import { BookImage } from '../domain/value-objects/image.value-object';
import { BookOrmEntity } from './book.orm-entity';

export class BookOrmMapper extends OrmMapper<BookEntity, BookOrmEntity> {
  protected toOrmProps(entity: BookEntity): OrmEntityProps<BookOrmEntity> {
    const props = entity.getPropsCopy();
    const ormProps: OrmEntityProps<BookOrmEntity> = {
      isbn: props.isbn.value,
      title: props.title,
      subtitle: props.subtitle,
      originalTitle: props.originalTitle,
      authors: props.authors.map((author) => ({
        firstName: author.firstName,
        lastName: author.lastName,
      })),
      publisher: props.publisher,
      publishedDate: props.publishedDate,
      image: {
        imageName: props.image.imageName,
        imageSize: props.image.imageSize,
        imageType: props.image.imageType,
      },
      pageCount: props.pageCount,
      overview: props.overview,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: BookOrmEntity): BookProps {
    const props: BookProps = {
      isbn: new ISBN(ormEntity.isbn),
      title: ormEntity.title,
      subtitle: ormEntity.subtitle,
      originalTitle: ormEntity.originalTitle,
      authors: ormEntity.authors.map(
        (author) =>
          new Author({
            firstName: author.firstName,
            lastName: author.lastName,
          }),
      ),
      publisher: ormEntity.publisher,
      publishedDate: ormEntity.publishedDate,
      image: new BookImage({
        imageName: ormEntity.image.imageName,
        imageSize: ormEntity.image.imageSize,
        imageType: ormEntity.image.imageType,
      }),
      pageCount: ormEntity.pageCount,
      overview: ormEntity.overview,
    };

    return props;
  }
}
