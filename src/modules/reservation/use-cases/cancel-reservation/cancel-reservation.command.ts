import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface CancelReservationProps {
  user: UserEntity;
  reservationId: string;
}
export class CancelReservationCommand {
  constructor(props: CancelReservationProps) {
    this.user = props.user;
    this.reservationId = props.reservationId;
  }

  readonly user: UserEntity;

  readonly reservationId: string;
}
