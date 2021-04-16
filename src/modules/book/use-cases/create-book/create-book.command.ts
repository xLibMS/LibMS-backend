import {
  Author,
  AuthorProps,
} from '@modules/book/domain/value-objects/author.value-object';
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
  image: string;
  pageCount: number;
  summary: string;
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
    this.pageCount = props.pageCount;
    this.summary = props.summary;
  }

  readonly isbn: ISBN;

  readonly title: string;

  readonly subtitle: string;

  readonly originalTitle?: string;

  readonly authors: Author[];

  readonly publisher: string;

  readonly publishedDate: Date;

  readonly image: string;

  readonly pageCount: number;

  readonly summary: string;
}
