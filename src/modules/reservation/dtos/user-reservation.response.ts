import { BookResponse } from '@modules/book/dtos/book.response.dto';
import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Book } from 'src/interface-adapters/interfaces/book/book.interface';
import { ReservationEntity } from '../domain/entities/reservation.entity';

export class UserReservationResponse extends ResponseBase {
  constructor(reservation: ReservationEntity) {
    super(reservation);
    this.book = new BookResponse(reservation.book);
    this.reservedAt = reservation.reservedAt.value;
    this.reservationStatus = reservation.reservationStatus;
    this.acceptedAt = reservation.acceptedAt?.value;
    this.returnDate = reservation.returnDate?.value;
  }

  book: Book;

  reservedAt: Date;

  reservationStatus: string;

  acceptedAt?: Date;

  returnDate?: Date;
}
