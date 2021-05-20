export interface AccceptReservationProps {
  reservationId: string;
}
export class AccceptReservationCommand {
  constructor(props: AccceptReservationProps) {
    this.reservationId = props.reservationId;
  }

  readonly reservationId: string;
}
