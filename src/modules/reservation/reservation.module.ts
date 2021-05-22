import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { BookRepository } from '@modules/book/database/book.repository';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationOrmEntity } from './database/reservation.orm-entity';
import { ReservationRepository } from './database/reservation.repository';
import { ReservationService } from './domain/services/reservation.service';
import {
  acceptReservationProvider,
  cancelReservationProvider,
  rejectReservationProvider,
  reserveBookProvider,
} from './reservation.provider';
import { AcceptReservationHttpController } from './use-cases/accept-reservation/accept-reservation.http.controller';
import { CancelReservationHttpController } from './use-cases/cancel-reservation/cancel-reservation.http.controller';
import { CreateReservationHttpController } from './use-cases/create-reservation/create-reservation.http.controller';
import { FindReservationsHttpController } from './use-cases/find-list-of-reservations/find-list-of-reservations.http.controller';
import { FindUserReservationsHttpController } from './use-cases/find-user-list-of-reservations/find-user-list-of-reservations.http.controller';
import { RejectReservationHttpController } from './use-cases/reject-reservation/reject-reservation.http.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationOrmEntity,
      BookOrmEntity,
      UserOrmEntity,
    ]),
    JwtModule.register({}),
    MulterModule.register({}),
    PassportModule,
    AuthService,
  ],
  controllers: [
    CreateReservationHttpController,
    FindReservationsHttpController,
    FindUserReservationsHttpController,
    AcceptReservationHttpController,
    CancelReservationHttpController,
    RejectReservationHttpController,
  ],
  providers: [
    AuthService,
    ReservationRepository,
    ReservationService,
    BookRepository,
    UserRepository,
    reserveBookProvider,
    acceptReservationProvider,
    cancelReservationProvider,
    rejectReservationProvider,
  ],
  exports: [],
})
export class ReservationModule {}
