import { ISBN } from '@modules/book/domain/value-objects/isbn.value-object';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { DateVO } from 'src/core/value-objects/date.value-object';

export interface ReservationRequestProps {
  isbn: string;
  email: Email;
  reservationDate: string;
}
export class RequestReservationCommand {
  constructor(props: ReservationRequestProps) {
    this.isbn = new ISBN(props.isbn);
    this.email = props.email;
    this.reservationDate = new DateVO(props.reservationDate);
  }

  readonly isbn: ISBN;

  readonly email: Email;

  readonly reservationDate: DateVO;
}
