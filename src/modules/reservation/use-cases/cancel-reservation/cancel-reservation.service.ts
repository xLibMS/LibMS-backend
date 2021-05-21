import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationService } from '@modules/reservation/domain/services/reservation.service';
import { ID } from 'src/core/value-objects/id.value-object';
import { CancelReservationCommand } from './cancel-reservation.command';

export class CancelReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly reservationService: ReservationService,
  ) {}

  async cancelReservation(
    cancelReservationCommand: CancelReservationCommand,
  ): Promise<ID> {
    const { user, reservationId } = cancelReservationCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );

    const canceledReservation = this.reservationService.cancelReservation(
      user,
      reservation,
    );

    const savedReservation = await this.reservationRepo.save(
      canceledReservation,
    );

    return savedReservation.id;
  }
}
