import { DomainException } from '@exceptions';
import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { Roles } from 'src/interface-adapters/enum/roles.enum';
import { AcceptReservation } from 'src/interface-adapters/interfaces/reservation/accept-reservation.interface';
import { ReservationEntity } from '../entities/reservation.entity';

export class ReservationService {
  public cancelReservation(
    user: UserEntity,
    reservation: ReservationEntity,
  ): ReservationEntity {
    /*
     * If user is a librarian => directly handle the cancellation
     * If user is a member => check if the reservation is made by the user, if not reject
     */
    if (
      user.role === Roles.member &&
      reservation.user.id.value !== user.id.value
    ) {
      throw new DomainException('You do not have permissions');
    }
    reservation.updateStatus('cancelled', 'cancelledAt');
    return reservation;
  }

  public acceptReservation(
    reservation: ReservationEntity,
    book: BookEntity,
  ): AcceptReservation {
    if (book.copieCount < 1) {
      throw new ConflictException('Book is out of stock');
    } else {
      book.updateCopiesCount(book.copieCount - 1);
      reservation.updateStatus('accepted', 'acceptedAt');
    }
    const acceptReservation: AcceptReservation = {
      book,
      reservation,
    };
    return acceptReservation;
  }
}
