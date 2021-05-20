import { AcceptReservationResponseI } from 'src/interface-adapters/interfaces/reservation/accept-reservation.response.interface';

export class AcceptReservationResponse {
  constructor(acceptReservationResponse?: AcceptReservationResponseI) {
    this.acceptReservationResponse = acceptReservationResponse || undefined;
  }

  acceptReservationResponse?: AcceptReservationResponseI;
}
