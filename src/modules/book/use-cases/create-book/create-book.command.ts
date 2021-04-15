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
  originTitle?: string;
  author: AuthorProps;
  publisher: string;
  publishedDate: Date;
  image: string;
  pages: number;
  summary: string;
}

export class CreateBookCommand {
  constructor(props: CreateBookProps) {
    this.isbn = new ISBN(props.isbn);
    this.title = props.title;
    this.subtitle = props.subtitle;
    this.originTitle = props.originTitle;
    this.author = new Author(props.author);
    this.publisher = props.publisher;
    this.publishedDate = props.publishedDate;
    this.image = props.image;
    this.pages = props.pages;
    this.summary = props.summary;
  }

  readonly isbn: ISBN;

  readonly title: string;

  readonly subtitle: string;

  readonly originTitle?: string;

  readonly author: Author;

  readonly publisher: string;

  readonly publishedDate: Date;

  readonly image: string;

  readonly pages: number;

  readonly summary: string;
}
