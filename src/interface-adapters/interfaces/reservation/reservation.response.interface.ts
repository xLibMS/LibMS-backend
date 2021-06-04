export interface IAcceptReservationResponse {
  id: string;
  reservationStatus: string;
  returnDate?: Date;
  copieCount: number;
}

export interface IRejectReservationResponse {
  id: string;
  reservationStatus: string;
}
