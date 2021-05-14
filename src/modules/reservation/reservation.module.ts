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
import { reserveBookProvider } from './reservation.provider';
import { RequestReservationHttpController } from './use-cases/request-reservation/request-reservation.http.controller';

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
  controllers: [RequestReservationHttpController],
  providers: [
    AuthService,
    ReservationRepository,
    BookRepository,
    reserveBookProvider,
    UserRepository,
  ],
  exports: [],
})
export class ReservationModule {}
