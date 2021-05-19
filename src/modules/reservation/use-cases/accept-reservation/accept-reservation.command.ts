import { DateVO } from 'src/core/value-objects/date.value-object';
import { ID } from 'src/core/value-objects/id.value-object';

export interface AccceptReservationProps {
  reservationId: string;
  acceptedAt: string;
}
export class AccceptReservationCommand {
  constructor(props: AccceptReservationProps) {
    this.reservationId = props.reservationId;
    this.acceptedAt = new DateVO(props.acceptedAt);
  }

  readonly reservationId: string;

  readonly acceptedAt: DateVO;
}
