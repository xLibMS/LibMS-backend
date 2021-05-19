import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { BookOrmMapper } from '@modules/book/database/book.orm-mapper';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserOrmMapper } from '@modules/user/database/user.orm-mapper';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { DateVO } from 'src/core/value-objects/date.value-object';
import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import {
  ReservationEntity,
  ReservationCreationProps,
} from '../domain/entities/reservation-request.entity';
import { ReservationOrmEntity } from './reservation.orm-entity';

export class ReservationOrmMapper extends OrmMapper<
  ReservationEntity,
  ReservationOrmEntity
> {
  protected toOrmProps(
    entity: ReservationEntity,
  ): OrmEntityProps<ReservationOrmEntity> {
    const props = entity.getPropsCopy();
    const userOrmMapper = new UserOrmMapper(UserEntity, UserOrmEntity);
    const bookOrmMapper = new BookOrmMapper(BookEntity, BookOrmEntity);

    const user = userOrmMapper.toOrmEntity(props.user);
    const book = bookOrmMapper.toOrmEntity(props.book);

    const ormProps: OrmEntityProps<ReservationOrmEntity> = {
      reservationStatus: props.reservationStatusType,
      user,
      book,
      reservedAt: props.reservedAt.value,
      acceptedAt: props.acceptedAt?.value,
      returnDate: props.returnDate?.value,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: ReservationOrmEntity,
  ): ReservationCreationProps {
    const userOrmMapper = new UserOrmMapper(UserEntity, UserOrmEntity);
    const bookOrmMapper = new BookOrmMapper(BookEntity, BookOrmEntity);

    const user = userOrmMapper.toDomainEntity(ormEntity.user);
    const book = bookOrmMapper.toDomainEntity(ormEntity.book);
    const props: ReservationCreationProps = {
      reservationStatusType: ormEntity.reservationStatus,
      book,
      user,
      reservedAt: new DateVO(ormEntity.reservedAt),
      acceptedAt: ormEntity.acceptedAt
        ? new DateVO(ormEntity.acceptedAt)
        : undefined,
      returnDate: ormEntity.returnDate
        ? new DateVO(ormEntity.returnDate)
        : undefined,
    };
    return props;
  }
}
