import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status-types.enum';

export interface ReservationRequestProps {
  book: BookEntity;
  reservationDate: DateVO;
  user: UserEntity;
  reservationStatusType: ReservationStatusTypes;
}

export class ReservationRequestEntity extends AggregateRoot<ReservationRequestProps> {
  constructor(props: ReservationRequestProps) {
    super(props);
  }

  get user(): UserEntity {
    return this.props.user;
  }

  get book(): BookEntity {
    return this.props.book;
  }

  get reservationDate(): DateVO {
    return this.props.reservationDate;
  }

  get reservationStatusType(): ReservationStatusTypes {
    return this.props.reservationStatusType;
  }
}
