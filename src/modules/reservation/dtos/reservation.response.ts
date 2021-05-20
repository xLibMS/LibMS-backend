import { BookResponse } from '@modules/book/dtos/book.response.dts';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Book } from 'src/interface-adapters/interfaces/book/book.interface';
import { Reservation } from 'src/interface-adapters/interfaces/reservation/reservation.interface';
import { User } from 'src/interface-adapters/interfaces/user/user.interface';
import { ReservationEntity } from '../domain/entities/reservation.entity';

export class ReservationResponse extends ResponseBase implements Reservation {
  constructor(reservation: ReservationEntity) {
    super(reservation);
    this.book = new BookResponse(reservation.book);
    this.reservedAt = reservation.reservedAt.value;
    this.user = new UserResponse(reservation.user);
    this.reservationStatus = reservation.reservationStatus;
    this.acceptedAt = reservation.acceptedAt?.value;
    this.returnDate = reservation.returnDate?.value;
  }

  book: Book;

  reservedAt: Date;

  user: User;

  reservationStatus: string;

  acceptedAt?: Date;

  returnDate?: Date;
}
