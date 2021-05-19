import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status.enum';

export interface ReservationCreationProps {
  book: BookEntity;
  reservedAt: DateVO;
  user: UserEntity;
  reservationStatusType: ReservationStatusTypes;
  acceptedAt?: DateVO;
  returnDate?: DateVO;
  returnedDate?: DateVO;
}

export interface updateCopiesNbre {
  copiesNbre: number;
}

export class ReservationEntity extends AggregateRoot<ReservationCreationProps> {
  constructor(props: ReservationCreationProps) {
    super(props);
  }

  get user(): UserEntity {
    return this.props.user;
  }

  get book(): BookEntity {
    return this.props.book;
  }

  get reservedAt(): DateVO {
    return this.props.reservedAt;
  }

  get reservationStatusType(): ReservationStatusTypes {
    return this.props.reservationStatusType;
  }

  get acceptedAt(): DateVO | undefined {
    return this.props.acceptedAt;
  }

  get returnDate(): DateVO | undefined {
    return this.props.returnDate;
  }

  get returnedDate(): DateVO | undefined {
    return this.props.returnedDate;
  }

  updateReservationStatus(): void {
    this.props.reservationStatusType = ReservationStatusTypes.accepted;
  }

  setAcceptanceDate(acceptedAt: DateVO): void {
    this.props.acceptedAt = acceptedAt;
  }

  setReturnDate(returnDate: DateVO): void {
    this.props.returnDate = returnDate;
  }
}
