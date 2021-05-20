import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { AccceptReservationCommand } from './accept-reservation.command';

export class AcceptReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly bookRepo: BookRepositoryPort,
  ) {}

  async acceptReservation(
    acceptReservationCommand: AccceptReservationCommand,
  ): Promise<DateVO | undefined> {
    const { reservationId } = acceptReservationCommand;

    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );
    const book = await this.bookRepo.findBookById(reservation.book.id.value);

    book.updatedCopiesNbr(book.copiesNbr - 1);
    reservation.acceptReservation();

    await this.bookRepo.save(book);
    const accepted = await this.reservationRepo.save(reservation);

    return accepted.returnDate;
  }
}
