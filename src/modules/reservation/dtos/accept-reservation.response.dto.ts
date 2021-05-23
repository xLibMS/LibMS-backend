import { AcceptReservationResponseI } from 'src/interface-adapters/interfaces/reservation/reservation.response.interface';

export class AcceptReservationResponse {
  constructor(acceptReservationResponse?: AcceptReservationResponseI) {
    this.acceptReservationResponse = acceptReservationResponse || undefined;
  }

  acceptReservationResponse?: AcceptReservationResponseI;
}
