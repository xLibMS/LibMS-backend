import { ReservationEntity } from '@modules/reservation/domain/entities/reservation.entity';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ISBN } from '../value-objects/isbn.value-object';
import { AuthorEntity } from './author.entity';
import { ImageEntity } from './image.entity';

export interface BookProps {
  isbn: ISBN;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: AuthorEntity[];
  publisher: string;
  publishedDate: DateVO;
  image: ImageEntity;
  pageCount: number;
  overview?: string;
  copiesNbr: number;
  reservations?: ReservationEntity[];
}

export class BookEntity extends AggregateRoot<BookProps> {
  constructor(props: BookProps) {
    super(props);
  }

  get isbn(): ISBN {
    return this.props.isbn;
  }

  get title(): string {
    return this.props.title;
  }

  get subtitle(): string | undefined {
    return this.props.subtitle;
  }

  get originalTitle(): string | undefined {
    return this.props.originalTitle;
  }

  get authors(): AuthorEntity[] {
    return this.props.authors;
  }

  get publisher(): string {
    return this.props.publisher;
  }

  get publishedDate(): DateVO {
    return this.props.publishedDate;
  }

  get image(): ImageEntity {
    return this.props.image;
  }

  get pageCount(): number {
    return this.props.pageCount;
  }

  get overview(): string | undefined {
    return this.props.overview;
  }

  get copiesNbr(): number {
    return this.props.copiesNbr;
  }

  get reservations(): ReservationEntity[] | undefined {
    return this.props.reservations;
  }

  updatedCopiesNbr(newCopiesNbr: number): void {
    this.props.copiesNbr = newCopiesNbr;
  }
}
