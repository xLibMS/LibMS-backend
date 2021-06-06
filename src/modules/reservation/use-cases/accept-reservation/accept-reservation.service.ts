import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationService } from '@modules/reservation/domain/services/reservation.service';

export class AcceptReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly bookRepo: BookRepositoryPort,
    private readonly reservationService: ReservationService,
  ) {}

  async acceptReservation(id: string): Promise<void> {
    const reservation = await this.reservationRepo.findReservationById(id);
    const book = await this.bookRepo.findBookById(reservation.book.id.value);

    this.reservationService.acceptReservation(reservation, book);

    await this.bookRepo.save(book);
    await this.reservationRepo.save(reservation);
  }
}
