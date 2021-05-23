export interface AcceptReservationResponseI {
  id: string;
  reservationStatus: string;
  returnDate?: Date;
  copiesNbr: number;
}

export interface RejectReservationResponseI {
  id: string;
  reservationStatus: string;
}
