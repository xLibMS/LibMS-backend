import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationRequestEntity } from '@modules/reservation/domain/entities/reservation-request.entity';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { ID } from 'src/core/value-objects/id.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status-types.enum';
import { RequestReservationCommand } from './request-reservation.command';

export class RequestReservationService {
  constructor(
    private readonly bookRepo: BookRepositoryPort,
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async requestReservation(
    requestReservationCommand: RequestReservationCommand,
  ): Promise<ID> {
    const { reservationDate, isbn, email, ...demand } =
      requestReservationCommand;

    const book = await this.bookRepo.findOneByISBNOrThrow(isbn.value);

    const user = await this.userRepo.findOneByEmailOrThrow(email.value);

    const requestReservation = new ReservationRequestEntity({
      ...demand,
      book,
      user,
      reservationDate,
      reservationStatusType: ReservationStatusTypes.pending,
    });

    const created = await await this.reservationRepo.save(requestReservation);

    return created.id;
  }
}
