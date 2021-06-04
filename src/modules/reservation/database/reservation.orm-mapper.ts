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
  ReservationProps,
} from '../domain/entities/reservation.entity';
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
      reservationStatus: props.reservationStatus,
      user,
      book,
      reservedAt: props.reservedAt.value,
      acceptedAt: props.acceptedAt?.value,
      returnDate: props.returnDate?.value,
      returnedAt: props.returnedAt?.value,
      cancelledAt: props.cancelledAt?.value,
      rejectedAt: props.rejectedAt?.value,
      checkedOutAt: props.checkedOutAt?.value,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: ReservationOrmEntity): ReservationProps {
    const toDateVO = (date: Date | undefined) =>
      date ? new DateVO(date) : undefined;

    const userOrmMapper = new UserOrmMapper(UserEntity, UserOrmEntity);
    const bookOrmMapper = new BookOrmMapper(BookEntity, BookOrmEntity);

    const user = userOrmMapper.toDomainEntity(ormEntity.user);
    const book = bookOrmMapper.toDomainEntity(ormEntity.book);

    const props: ReservationProps = {
      reservationStatus: ormEntity.reservationStatus,
      book,
      user,
      reservedAt: new DateVO(ormEntity.reservedAt),
      acceptedAt: toDateVO(ormEntity.acceptedAt),
      returnDate: toDateVO(ormEntity.returnDate),
      returnedAt: toDateVO(ormEntity.returnedAt),
      cancelledAt: toDateVO(ormEntity.cancelledAt),
      rejectedAt: toDateVO(ormEntity.rejectedAt),
      checkedOutAt: toDateVO(ormEntity.checkedOutAt),
    };

    return props;
  }
}
