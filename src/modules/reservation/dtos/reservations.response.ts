import { ReservationResponse } from './reservation.response';
import { UserReservationResponse } from './user-reservation.response';

export class ReservationsResponse {
  constructor(reservations: ReservationResponse[] | UserReservationResponse[]) {
    this.reservations = reservations;
  }

  reservations: ReservationResponse[] | UserReservationResponse[];
}
