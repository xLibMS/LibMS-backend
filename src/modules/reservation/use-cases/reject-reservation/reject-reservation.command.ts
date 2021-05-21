export interface RejectReservationProps {
  reservationId: string;
}

export class RejectReservationCommand {
	constructor(props: RejectReservationProps) {
		this.reservationId = props.reservationId;
	}

	readonly reservationId: string;
}