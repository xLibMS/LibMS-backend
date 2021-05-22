import { Book } from '../book/book.interface';
import { ModelBase } from '../model.base.interface';
import { User } from '../user/user.interface';

export interface Reservation extends ModelBase {
  book: Book;
  reservedAt: Date;
  user?: User;
  reservationStatus: string;
}
