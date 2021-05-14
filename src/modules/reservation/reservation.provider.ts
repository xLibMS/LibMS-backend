import { BookRepository } from '@modules/book/database/book.repository';
import { UserRepository } from '@modules/user/database/user.repository';
import { Provider } from '@nestjs/common';
import { ReservationRepository } from './database/reservation.repository';
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
