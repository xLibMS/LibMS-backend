import { ISBN } from '@modules/book/domain/value-objects/isbn.value-object';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { DateVO } from 'src/core/value-objects/date.value-object';

export interface ReservationCreationProps {
  isbn: string;
  user: UserEntity;
  reservedAt: string;
}
export class CreateReservationCommand {
  constructor(props: ReservationCreationProps) {
    this.isbn = new ISBN(props.isbn);
    this.user = props.user;
    this.reservedAt = new DateVO(props.reservedAt);
  }

  readonly isbn: ISBN;

  readonly user: UserEntity;

  readonly reservedAt: DateVO;
}
