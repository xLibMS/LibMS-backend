import { ReservationResponse } from './reservation.response';

export class ReservationsResponse {
  constructor(reservations: ReservationResponse[]) {
    this.reservations = reservations;
  }

  reservations: ReservationResponse[];
}
