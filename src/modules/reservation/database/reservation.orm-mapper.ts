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
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status-types.enum';
import {
  ReservationRequestEntity,
  ReservationRequestProps,
} from '../domain/entities/reservation-request.entity';
import { ReservationOrmEntity } from './reservation.orm-entity';

export class ReservationOrmMapper extends OrmMapper<
  ReservationRequestEntity,
  ReservationOrmEntity
> {
  protected toOrmProps(
    entity: ReservationRequestEntity,
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
      reservationDate: props.reservationDate.value,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: ReservationOrmEntity,
  ): ReservationRequestProps {
    const userOrmMapper = new UserOrmMapper(UserEntity, UserOrmEntity);
    const bookOrmMapper = new BookOrmMapper(BookEntity, BookOrmEntity);

    const user = userOrmMapper.toDomainEntity(ormEntity.user);
    const book = bookOrmMapper.toDomainEntity(ormEntity.book);

    const props: ReservationRequestProps = {
      reservationStatusType: ormEntity.reservationStatus,
      book,
      user,
      reservationDate: new DateVO(ormEntity.reservationDate),
    };
    return props;
  }
}
