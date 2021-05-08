import { ISBN } from '@modules/book/domain/value-objects/isbn.value-object';
import { Author } from 'src/interface-adapters/interfaces/book/author.interface';
import { Image } from 'src/interface-adapters/interfaces/book/image.interface';

export interface CreateBookProps {
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publisher: string;
  publishedDate: Date;
  image?: Image;
  storedImage?: Buffer;
  pageCount: number;
  overview?: string;
}

export class CreateBookCommand {
  constructor(props: CreateBookProps) {
    this.isbn = new ISBN(props.isbn);
    this.title = props.title;
    this.subtitle = props.subtitle;
    this.originalTitle = props.originalTitle;
    this.authors = props.authors;
    this.publisher = props.publisher;
    this.publishedDate = props.publishedDate;
    this.pageCount = props.pageCount;
    this.overview = props.overview;
  }

  readonly isbn: ISBN;

  readonly title: string;

  readonly subtitle?: string;

  readonly originalTitle?: string;

  readonly authors: Author[];

  readonly publisher: string;

  readonly publishedDate: Date;

  readonly image?: Image;

  readonly pageCount: number;

  readonly overview?: string;
}
