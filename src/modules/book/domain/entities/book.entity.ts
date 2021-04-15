import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { Author } from '../value-objects/author.value-object';
import { ISBN } from '../value-objects/isbn.value-object';

export interface BookProps {
  isbn: ISBN;
  title: string;
  subtitle: string;
  originTitle?: string;
  // Should become an array of authors
  author: Author;
  publisher: string;
  publishedDate: Date;
  image: string;
  pages: number;
  summary: string;
}

export class BookEntity extends AggregateRoot<BookProps> {
  constructor(props: BookProps) {
    super(props);
  }
}
