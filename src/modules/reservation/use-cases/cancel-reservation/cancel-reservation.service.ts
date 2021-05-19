import { DomainException } from '@exceptions';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ID } from 'src/core/value-objects/id.value-object';
import { Roles } from 'src/interface-adapters/enum/roles.enum';
import { CancelReservationCommand } from './cancel-reservation.command';

export class CancelReservationService {
  constructor(private readonly reservationRepo: ReservationRepositoryPort) {}

  async cancelReservation(
    cancelReservationCommand: CancelReservationCommand,
  ): Promise<ID> {
    const { user, reservationId } = cancelReservationCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );
    /*
     * If user is a librarian => directly handle the cancellation
     * If user is a member => check if the reservation is made by the user, if not reject
     */
    if (
      user.role === Roles.member &&
      reservation.user.id.value !== user.id.value
    ) {
      throw new DomainException('You do not have permissions');
    }
    reservation.cancelReservation();
    const savedReservation = await this.reservationRepo.save(reservation);

    return savedReservation.id;
  }
}
