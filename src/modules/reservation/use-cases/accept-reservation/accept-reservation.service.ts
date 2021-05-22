import { ConflictException } from '@exceptions';
import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { AcceptReservationResponseI } from 'src/interface-adapters/interfaces/reservation/accept-reservation.response.interface';
import { AccceptReservationCommand } from './accept-reservation.command';

export class AcceptReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly bookRepo: BookRepositoryPort,
  ) {}

  async acceptReservation(
    acceptReservationCommand: AccceptReservationCommand,
  ): Promise<AcceptReservationResponseI | undefined> {
    const { reservationId } = acceptReservationCommand;

    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );
    const book = await this.bookRepo.findBookById(reservation.book.id.value);
    let bookResponse;
    let reservationResponse;
    if (book.copiesNbr >= 1) {
      book.updatedCopiesNbr(book.copiesNbr - 1);
      reservation.acceptReservation();
      bookResponse = await this.bookRepo.save(book);
      reservationResponse = await this.reservationRepo.save(reservation);
    } else {
      throw new ConflictException('The book is out of stock');
    }
    const acceptReservationResponse: AcceptReservationResponseI = {
      copiesNbr: bookResponse.copiesNbr,
      reservationStatus: reservationResponse.reservationStatus,
      returnDate: reservationResponse.returnDate?.value,
      id: reservationResponse.id.value,
    };
    return acceptReservationResponse || undefined;
  }
}
