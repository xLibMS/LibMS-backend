import { ReservationOrmEntity } from '@modules/reservation/database/reservation.orm-entity';
import { ReservationOrmMapper } from '@modules/reservation/database/reservation.orm-mapper';
import { ReservationEntity } from '@modules/reservation/domain/entities/reservation.entity';
import { DateVO } from 'src/core/value-objects/date.value-object';
import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { AuthorEntity } from '../domain/entities/author.entity';
import { BookEntity, BookProps } from '../domain/entities/book.entity';
import { ImageEntity } from '../domain/entities/image.entity';
import { ISBN } from '../domain/value-objects/isbn.value-object';
import { AuthorOrmEntity } from './author/author.orm-entity';
import { AuthorOrmMapper } from './author/author.orm-mapper';
import { BookOrmEntity } from './book.orm-entity';
import { ImageOrmEntity } from './image/image.orm-entity';
import { ImageOrmMapper } from './image/image.orm-mapper';

export class BookOrmMapper extends OrmMapper<BookEntity, BookOrmEntity> {
  protected toOrmProps(entity: BookEntity): OrmEntityProps<BookOrmEntity> {
    const props = entity.getPropsCopy();
    const authorOrmMapper = new AuthorOrmMapper(AuthorEntity, AuthorOrmEntity);
    const imageOrmMapper = new ImageOrmMapper(ImageEntity, ImageOrmEntity);
    const reservationOrmMapper = new ReservationOrmMapper(
      ReservationEntity,
      ReservationOrmEntity,
    );

    const authors = props.authors.map((author) =>
      authorOrmMapper.toOrmEntity(author),
    );
    const reservations = props.reservations
      ? props.reservations.map((reservation) =>
          reservationOrmMapper.toOrmEntity(reservation),
        )
      : undefined;
    const image = imageOrmMapper.toOrmEntity(props.image);

    const ormProps: OrmEntityProps<BookOrmEntity> = {
      isbn: props.isbn.value,
      title: props.title,
      subtitle: props.subtitle,
      originalTitle: props.originalTitle,
      authors,
      publisher: props.publisher,
      publishedDate: props.publishedDate.value,
      image,
      pageCount: props.pageCount,
      overview: props.overview,
      reservations,
      copieCount: props.copieCount,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: BookOrmEntity): BookProps {
    const authorOrmMapper = new AuthorOrmMapper(AuthorEntity, AuthorOrmEntity);
    const imageOrmMapper = new ImageOrmMapper(ImageEntity, ImageOrmEntity);

    const authors = ormEntity.authors.map((author) =>
      authorOrmMapper.toDomainEntity(author),
    );
    const image = imageOrmMapper.toDomainEntity(ormEntity.image);

    const props: BookProps = {
      isbn: new ISBN(ormEntity.isbn),
      title: ormEntity.title,
      subtitle: ormEntity.subtitle,
      originalTitle: ormEntity.originalTitle,
      authors,
      publisher: ormEntity.publisher,
      publishedDate: new DateVO(ormEntity.publishedDate),
      image,
      pageCount: ormEntity.pageCount,
      overview: ormEntity.overview,
      copieCount: ormEntity.copieCount,
    };

    return props;
  }
}
