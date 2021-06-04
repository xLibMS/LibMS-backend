import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationService } from '@modules/reservation/domain/services/reservation.service';
import { IAcceptReservationResponse } from 'src/interface-adapters/interfaces/reservation/reservation.response.interface';
import { AccceptReservationCommand } from './accept-reservation.command';

export class AcceptReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly bookRepo: BookRepositoryPort,
    private readonly reservationService: ReservationService,
  ) {}

  async acceptReservation(
    acceptReservationCommand: AccceptReservationCommand,
  ): Promise<IAcceptReservationResponse> {
    const { reservationId } = acceptReservationCommand;

    const reservationEntity = await this.reservationRepo.findReservationById(
      reservationId,
    );
    const bookEntity = await this.bookRepo.findBookById(
      reservationEntity.book.id.value,
    );

    const { book, reservation } = this.reservationService.acceptReservation(
      reservationEntity,
      bookEntity,
    );

    const bookResponse = await this.bookRepo.save(book);
    const reservationResponse = await this.reservationRepo.save(reservation);

    const acceptReservationResponse: IAcceptReservationResponse = {
      copieCount: bookResponse.copieCount,
      reservationStatus: reservationResponse.reservationStatus,
      returnDate: reservationResponse.returnDate?.value,
      id: reservationResponse.id.value,
    };
    return acceptReservationResponse;
  }
}
