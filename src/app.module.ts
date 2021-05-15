import { mailerConfig } from '@config/mailer.config';
import { BookModule } from '@modules/book/book.module';
import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { BookRepository } from '@modules/book/database/book.repository';
import { ReservationOrmEntity } from '@modules/reservation/database/reservation.orm-entity';
import { ReservationRepository } from '@modules/reservation/database/reservation.repository';
import { ReservationModule } from '@modules/reservation/reservation.module';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import * as typeormConfig from './infrastructure/configs/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([
      UserOrmEntity,
      BookOrmEntity,
      ReservationOrmEntity,
    ]),
    MailerModule.forRoot(mailerConfig),
    UserModule,
    BookModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [UserRepository, BookRepository, ReservationRepository],
})
export class AppModule {}
