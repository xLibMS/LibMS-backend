import { IAcceptReservationResponse } from 'src/interface-adapters/interfaces/reservation/reservation.response.interface';

export class AcceptReservationResponse {
  constructor(acceptReservationResponse?: IAcceptReservationResponse) {
    this.acceptReservationResponse = acceptReservationResponse || undefined;
  }

  acceptReservationResponse?: IAcceptReservationResponse;
}
