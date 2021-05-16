import { BookResponse } from '@modules/book/dtos/book.response.dts';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Book } from 'src/interface-adapters/interfaces/book/book.interface';
import { Reservation } from 'src/interface-adapters/interfaces/reservation/reservation.interface';
import { User } from 'src/interface-adapters/interfaces/user/user.interface';
import { ReservationRequestEntity } from '../domain/entities/reservation-request.entity';

export class ReservationResponse extends ResponseBase implements Reservation {
  constructor(reservation: ReservationRequestEntity) {
    super(reservation);
    this.book = new BookResponse(reservation.book);
    this.reservationDate = reservation.reservationDate.value;
    this.user = new UserResponse(reservation.user);
    this.reservationStatus = reservation.reservationStatusType;
  }

  book: Book;

  reservationDate: Date;

  user: User;

  reservationStatus: string;
}
