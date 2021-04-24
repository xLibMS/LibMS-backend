import {
  Author,
  AuthorProps,
} from '@modules/book/domain/value-objects/author.value-object';
import { BookImage } from '@modules/book/domain/value-objects/image.value-object';
import {
  ISBN,
  ISBNProps,
} from '@modules/book/domain/value-objects/isbn.value-object';

export interface CreateBookProps {
  isbn: ISBNProps;
  title: string;
  subtitle: string;
  originalTitle?: string;
  authors: AuthorProps[];
  publisher: string;
  publishedDate: Date;
  image: BookImage;
  storedImage: Buffer;
  pageCount: number;
  overview?: string;
}

export class CreateBookCommand {
  constructor(props: CreateBookProps) {
    this.isbn = new ISBN(props.isbn);
    this.title = props.title;
    this.subtitle = props.subtitle;
    this.originalTitle = props.originalTitle;
    this.authors = props.authors.map((author) => new Author(author));
    this.publisher = props.publisher;
    this.publishedDate = props.publishedDate;
    this.image = props.image;
    this.storedImage = props.storedImage;
    this.pageCount = props.pageCount;
    this.overview = props.overview;
  }

  readonly isbn: ISBN;

  readonly title: string;

  readonly subtitle: string;

  readonly originalTitle?: string;

  readonly authors: Author[];

  readonly publisher: string;

  readonly publishedDate: Date;

  readonly image: BookImage;

  readonly pageCount: number;

  readonly overview?: string;

  readonly storedImage: Buffer;
}
