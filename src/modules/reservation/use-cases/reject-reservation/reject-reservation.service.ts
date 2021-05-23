import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { RejectReservationResponseI } from 'src/interface-adapters/interfaces/reservation/reservation.response.interface';
import { RejectReservationCommand } from './reject-reservation.command';

export class RejectReservationService {
  constructor(private readonly reservationRepo: ReservationRepositoryPort) {}

  async rejectReservation(
    rejectReservationCommand: RejectReservationCommand,
  ): Promise<RejectReservationResponseI> {
    const { reservationId } = rejectReservationCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );

    reservation.rejectReservation();

    const reservationResponse = await this.reservationRepo.save(reservation);
    const rejectReservationResponse: RejectReservationResponseI = {
      reservationStatus: reservationResponse.reservationStatus,
      id: reservationResponse.id.value,
    };

    return rejectReservationResponse;
  }
}
