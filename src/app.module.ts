import { BookModule } from '@modules/book/book.module';
import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { BookRepository } from '@modules/book/database/book.repository';
import { DomainEventHandlersModule } from '@modules/domain-event-handlers/domain-event-handlers.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { ReservationOrmEntity } from '@modules/reservation/database/reservation.orm-entity';
import { ReservationRepository } from '@modules/reservation/database/reservation.repository';
import { ReservationModule } from '@modules/reservation/reservation.module';
import { ConfirmationTokenOrmEntity } from '@modules/user/database/confirmation-token/confirmation-token.orm-entity';
import { ConfirmationTokenRepository } from '@modules/user/database/confirmation-token/confirmation-token.repository';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
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
      ConfirmationTokenOrmEntity,
    ]),
    UserModule,
    BookModule,
    ReservationModule,
    DomainEventHandlersModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [
    UserRepository,
    BookRepository,
    ReservationRepository,
    ConfirmationTokenRepository,
  ],
})
export class AppModule {}
