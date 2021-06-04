import { ISBN } from '@modules/book/domain/value-objects/isbn.value-object';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { Author } from 'src/interface-adapters/interfaces/book/author.interface';

export interface CreateBookProps {
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publisher: string;
  publishedDate: string;
  image: Express.Multer.File;
  pageCount: number;
  overview?: string;
  copieCount: number;
}

export class CreateBookCommand {
  constructor(props: CreateBookProps) {
    this.isbn = new ISBN(props.isbn);
    this.title = props.title;
    this.subtitle = props.subtitle;
    this.originalTitle = props.originalTitle;
    this.authors = props.authors;
    this.publisher = props.publisher;
    this.publishedDate = new DateVO(props.publishedDate);
    this.image = props.image;
    this.pageCount = props.pageCount;
    this.overview = props.overview;
    this.copieCount = props.copieCount;
  }

  readonly isbn: ISBN;

  readonly title: string;

  readonly subtitle?: string;

  readonly originalTitle?: string;

  readonly authors: Author[];

  readonly publisher: string;

  readonly publishedDate: DateVO;

  readonly image: Express.Multer.File;

  readonly pageCount: number;

  readonly overview?: string;

  readonly copieCount: number;
}
