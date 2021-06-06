import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';

export class CheckOutService {
  constructor(private readonly reservationRepo: ReservationRepositoryPort) {}

  async checkOut(id: string): Promise<void> {
    const reservation = await this.reservationRepo.findReservationById(id);

    reservation.updateStatus('checkedOut', 'checkedOutAt');

    await this.reservationRepo.save(reservation);
  }
}
