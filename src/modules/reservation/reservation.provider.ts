import { BookRepository } from '@modules/book/database/book.repository';
import { UserRepository } from '@modules/user/database/user.repository';
import { Provider } from '@nestjs/common';
import { ReservationRepository } from './database/reservation.repository';
import { AcceptReservationService } from './use-cases/accept-reservation/accept-reservation.service';
import { RequestReservationService } from './use-cases/request-reservation/request-reservation.service';

export const reserveBookSymbol = Symbol('reserveBook');

export const reserveBookProvider: Provider = {
  provide: reserveBookSymbol,
  useFactory: (
    reservationRepo: ReservationRepository,
    bookRepo: BookRepository,
    userRepo: UserRepository,
  ): RequestReservationService =>
    new RequestReservationService(bookRepo, reservationRepo, userRepo),
  inject: [ReservationRepository, BookRepository, UserRepository],
};

export const acceptReservationSymbol = Symbol('acceptReservation');

export const acceptReservationProvider: Provider = {
  provide: acceptReservationSymbol,
  useFactory: (
    reservationRepo: ReservationRepository,
    bookRepo: BookRepository,
  ): AcceptReservationService =>
    new AcceptReservationService(reservationRepo, bookRepo),
  inject: [ReservationRepository, BookRepository],
};
