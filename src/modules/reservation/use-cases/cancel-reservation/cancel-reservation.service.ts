import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationService } from '@modules/reservation/domain/services/reservation.service';
import { CancelReservationCommand } from './cancel-reservation.command';

export class CancelReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly reservationService: ReservationService,
  ) {}

  async cancelReservation(
    cancelReservationCommand: CancelReservationCommand,
  ): Promise<void> {
    const { user, reservationId } = cancelReservationCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );

    this.reservationService.cancelReservation(user, reservation);

    await this.reservationRepo.save(reservation);
  }
}
