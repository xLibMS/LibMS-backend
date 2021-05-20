import { BookRepository } from '@modules/book/database/book.repository';
import { UserRepository } from '@modules/user/database/user.repository';
import { Provider } from '@nestjs/common';
import { ReservationRepository } from './database/reservation.repository';
import { AcceptReservationService } from './use-cases/accept-reservation/accept-reservation.service';
import { CancelReservationService } from './use-cases/cancel-reservation/cancel-reservation.service';
import { CreateReservationService } from './use-cases/create-reservation/create-reservation.service';

export const reserveBookSymbol = Symbol('reserveBook');

export const reserveBookProvider: Provider = {
  provide: reserveBookSymbol,
  useFactory: (
    reservationRepo: ReservationRepository,
    bookRepo: BookRepository,
  ): CreateReservationService =>
    new CreateReservationService(bookRepo, reservationRepo),
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

export const cancelReservationSymbol = Symbol('cancelReservation');

export const cancelReservationProvider: Provider = {
  provide: cancelReservationSymbol,
  useFactory: (
    reservationRepo: ReservationRepository,
  ): CancelReservationService => new CancelReservationService(reservationRepo),
  inject: [ReservationRepository],
};
