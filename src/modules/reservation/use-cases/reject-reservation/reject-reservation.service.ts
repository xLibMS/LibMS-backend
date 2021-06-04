import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { IRejectReservationResponse } from 'src/interface-adapters/interfaces/reservation/reservation.response.interface';
import { RejectReservationCommand } from './reject-reservation.command';

export class RejectReservationService {
  constructor(private readonly reservationRepo: ReservationRepositoryPort) {}

  async rejectReservation(
    rejectReservationCommand: RejectReservationCommand,
  ): Promise<IRejectReservationResponse> {
    const { reservationId } = rejectReservationCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );

    reservation.updateStatus('rejected', 'rejectedAt');

    const reservationResponse = await this.reservationRepo.save(reservation);
    const rejectReservationResponse: IRejectReservationResponse = {
      reservationStatus: reservationResponse.reservationStatus,
      id: reservationResponse.id.value,
    };

    return rejectReservationResponse;
  }
}
