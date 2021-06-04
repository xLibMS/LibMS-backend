import { BookEntity } from '@modules/book/domain/entities/book.entity';
import { ReservationEntity } from '@modules/reservation/domain/entities/reservation.entity';

export interface AcceptReservation {
  book: BookEntity;
  reservation: ReservationEntity;
}
