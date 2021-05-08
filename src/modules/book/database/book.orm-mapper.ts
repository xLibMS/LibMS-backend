import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { BookEntity, BookProps } from '../domain/entities/book.entity';
import { ISBN } from '../domain/value-objects/isbn.value-object';
import { BookOrmEntity } from './book.orm-entity';
import { AuthorEntity } from '../domain/entities/author.entity';
import { ImageEntity } from '../domain/entities/image.entity';
import { AuthorOrmMapper } from './author/author.orm-mapper';
import { AuthorOrmEntity } from './author/author.orm-entity';
import { ImageOrmMapper } from './image/image.orm-mapper';
import { ImageOrmEntity } from './image/image.orm-entity';

export class BookOrmMapper extends OrmMapper<BookEntity, BookOrmEntity> {
  protected toOrmProps(entity: BookEntity): OrmEntityProps<BookOrmEntity> {
    const props = entity.getPropsCopy();
    const authorMapper = new AuthorOrmMapper(AuthorEntity, AuthorOrmEntity);
    const authorsOrm = props.authors.map((author) =>
      authorMapper.toOrmEntity(author),
    );
    const imageMapper = new ImageOrmMapper(ImageEntity, ImageOrmEntity);
    const imageOrm = imageMapper.toOrmEntity(props.image);
    const ormProps: OrmEntityProps<BookOrmEntity> = {
      isbn: props.isbn.value,
      title: props.title,
      subtitle: props.subtitle,
      originalTitle: props.originalTitle,
      authors: authorsOrm,
      publisher: props.publisher,
      publishedDate: props.publishedDate,
      image: imageOrm,
      pageCount: props.pageCount,
      overview: props.overview,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: BookOrmEntity): BookProps {
    const authorMapper = new AuthorOrmMapper(AuthorEntity, AuthorOrmEntity);
    const authorsOrm = ormEntity.authors.map((author) =>
      authorMapper.toDomainEntity(author),
    );
    const imageMapper = new ImageOrmMapper(ImageEntity, ImageOrmEntity);
    const imageOrm = imageMapper.toDomainEntity(ormEntity.image);
    const props: BookProps = {
      isbn: new ISBN(ormEntity.isbn),
      title: ormEntity.title,
      subtitle: ormEntity.subtitle,
      originalTitle: ormEntity.originalTitle,
      authors: authorsOrm,
      publisher: ormEntity.publisher,
      publishedDate: ormEntity.publishedDate,
      image: imageOrm,
      pageCount: ormEntity.pageCount,
      overview: ormEntity.overview,
    };

    return props;
  }
}
