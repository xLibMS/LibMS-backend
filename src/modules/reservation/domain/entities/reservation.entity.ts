import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import ms from 'ms';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status.enum';

export interface ReservationCreationProps {
  book: BookEntity;
  reservedAt: DateVO;
  user: UserEntity;
  reservationStatus: ReservationStatusTypes;
  acceptedAt?: DateVO;
  returnDate?: DateVO;
  returnedDate?: DateVO;
  cancelledAt?: DateVO;
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

  get reservationStatus(): ReservationStatusTypes {
    return this.props.reservationStatus;
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

  get cancelledAt(): DateVO | undefined {
    return this.props.cancelledAt;
  }

  updateReservationStatus(): void {
    this.props.reservationStatus = ReservationStatusTypes.accepted;
  }

  setAcceptanceDate(acceptedAt: DateVO): void {
    this.props.acceptedAt = acceptedAt;
  }

  setReturnDate(returnDate: DateVO): void {
    this.props.returnDate = returnDate;
  }

  acceptReservation(): void {
    switch (this.props.reservationStatus) {
      case ReservationStatusTypes.pending:
        this.props.reservationStatus = ReservationStatusTypes.accepted;
        this.props.acceptedAt = new DateVO(Date.now());
        this.props.returnDate = new DateVO(
          this.props.acceptedAt.value.getTime() + ms('15d'),
        );
        break;
      case ReservationStatusTypes.accepted:
        throw new ConflictException('Reservation is already accepted');
      case ReservationStatusTypes.closed:
        throw new ConflictException('Reservation already closed');
      case ReservationStatusTypes.rejected:
        throw new ConflictException(
          'A rejected reservation cannot be accepted',
        );
      default:
        break;
    }
  }

  cancelReservation(): void {
    switch (this.props.reservationStatus) {
      case ReservationStatusTypes.pending:
        this.props.reservationStatus = ReservationStatusTypes.cancelled;
        this.props.cancelledAt = new DateVO(Date.now());
        break;
      case ReservationStatusTypes.accepted:
        throw new ConflictException('An accepted reservation cannot be closed');
      case ReservationStatusTypes.closed:
        throw new ConflictException('Reservation already closed');
      case ReservationStatusTypes.cancelled:
        throw new ConflictException('Reservation already cancelled');
      case ReservationStatusTypes.rejected:
        throw new ConflictException(
          'A rejected reservation cannot be cancelled',
        );
      default:
        break;
    }
  }
}
