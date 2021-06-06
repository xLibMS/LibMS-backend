import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';

export class RejectReservationService {
  constructor(private readonly reservationRepo: ReservationRepositoryPort) {}

  async rejectReservation(id: string): Promise<void> {
    const reservation = await this.reservationRepo.findReservationById(id);

    reservation.updateStatus('rejected', 'rejectedAt');

    await this.reservationRepo.save(reservation);
  }
}
