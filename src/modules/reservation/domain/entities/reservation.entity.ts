import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import ms from 'ms';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status.enum';
import { DomainException } from '../../../../core/exceptions/domain.exception';

type Status = keyof typeof ReservationStatusTypes;

type NextStatus = { [key in Status]: Status[] | [] };

type StatusErrors = {
  [key in Status]?: {
    [key in Status]?: string;
  };
};

interface ReservationDates {
  returnDate?: DateVO;
  acceptedAt?: DateVO;
  returnedAt?: DateVO;
  cancelledAt?: DateVO;
  rejectedAt?: DateVO;
  checkedOutAt?: DateVO;
}

type ReservationDate = keyof ReservationDates;

export interface ReservationProps extends ReservationDates {
  book: BookEntity;
  user: UserEntity;
  reservedAt: DateVO;
  reservationStatus: ReservationStatusTypes;
}

export class ReservationEntity extends AggregateRoot<ReservationProps> {
  constructor(props: ReservationProps) {
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

  get returnedAt(): DateVO | undefined {
    return this.props.returnedAt;
  }

  get cancelledAt(): DateVO | undefined {
    return this.props.cancelledAt;
  }

  get rejectedAt(): DateVO | undefined {
    return this.props.rejectedAt;
  }

  get checkedOutAt(): DateVO | undefined {
    return this.props.checkedOutAt;
  }

  private nextStatus(status: Status): string[] {
    const nextStatus: NextStatus = {
      pending: ['accepted', 'rejected', 'cancelled'],
      accepted: ['cancelled', 'returned', 'checkedOut'],
      cancelled: [],
      rejected: [],
      returned: [],
      overdue: ['returned'],
      checkedOut: ['returned', 'overdue'],
    };
    return nextStatus[status] || [];
  }

  private statusErrors(
    previousStatus: Status,
    nextStatus: Status,
  ): string | undefined {
    const statusErrors: StatusErrors = {
      rejected: {
        accepted: 'Reservation is already accepted',
        returned: 'Book already returned',
        cancelled: 'Cannot cancel a rejected reservation',
        rejected: 'Reservation already rejected',
        overdue: 'Reservation is overdue',
        checkedOut: 'Book already checked out',
      },
      accepted: {
        accepted: 'Reservation is already accepted',
        returned: 'Reservation already closed',
        cancelled: 'Reservation is cancelled',
        rejected: 'Cannot accept a rejected reservation',
        overdue: 'Reservation is overdue',
        checkedOut: 'Book already checked out',
      },
      cancelled: {
        accepted: 'An accepted reservation cannot be cancelled',
        returned: 'Book already returned',
        cancelled: 'Reservation already cancelled',
        rejected: 'Rejected reservation cannot be cancelled',
        overdue: 'Reservation is overdue',
        checkedOut: 'Book already checked out',
      },
      checkedOut: {
        cancelled: 'Cannot cancel the reservation of a checked out book',
        accepted: 'Cannot accept the reservation of a checked out book',
        rejected: 'Cannot accept the reservation of a checked out book',
        overdue: 'Reservation is overdue',
        returned: 'Book is returned',
      },
    };
    const statusErrorsMessages = statusErrors[previousStatus];
    return statusErrorsMessages ? statusErrorsMessages[nextStatus] : undefined;
  }

  updateStatus(status: Status, dateField: ReservationDate): void {
    const previousStatus = this.props.reservationStatus as Status;

    // This is an array of possible next states of a given reservation
    const nextStatus = this.nextStatus(previousStatus);

    /**
     * Check if the operation is possible.
     * If we are not allowed to go from prev status to next status
     * throw an error
     */
    if (!nextStatus.includes(status)) {
      const errorMessage = this.statusErrors(previousStatus, status);
      if (errorMessage) throw new ConflictException(errorMessage);
      throw new DomainException('Unable to update reservation status');
    }

    // set new reservation status
    this.props.reservationStatus = status as ReservationStatusTypes;

    const currentDate = Date.now();
    // This should become check out
    if (status === 'checkedOut') {
      this.props.returnDate = new DateVO(currentDate + ms('15d'));
    }
    this.props[dateField] = new DateVO(currentDate);
  }

  static validate(props: ReservationProps): void {
    if (props.book.copieCount === 0) {
      throw new ConflictException('Book is out of stock');
    }
  }
}
