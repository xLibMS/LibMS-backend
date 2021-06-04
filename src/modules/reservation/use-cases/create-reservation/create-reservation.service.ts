import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationEntity } from '@modules/reservation/domain/entities/reservation.entity';
import { ID } from 'src/core/value-objects/id.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status.enum';
import { ReservationProps } from '../../domain/entities/reservation.entity';
import { CreateReservationCommand } from './create-reservation.command';

export class CreateReservationService {
  constructor(
    private readonly bookRepo: BookRepositoryPort,
    private readonly reservationRepo: ReservationRepositoryPort,
  ) {}

  async CreateReservation(
    CreateReservationCommand: CreateReservationCommand,
  ): Promise<ID> {
    const { reservedAt, isbn, user, ...demand } = CreateReservationCommand;

    const book = await this.bookRepo.findOneByISBNOrThrow(isbn.value);

    const reservationProps: ReservationProps = {
      ...demand,
      book,
      user,
      reservedAt,
      reservationStatus: ReservationStatusTypes.pending,
    };
    ReservationEntity.validate(reservationProps);

    const reservation = new ReservationEntity(reservationProps);
    const created = await this.reservationRepo.save(reservation);
    return created.id;
  }
}
