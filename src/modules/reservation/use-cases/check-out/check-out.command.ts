export interface CheckOutProps {
  reservationId: string;
}
export class CheckOutCommand {
  constructor(props: CheckOutProps) {
    this.reservationId = props.reservationId;
  }

  readonly reservationId: string;
}
