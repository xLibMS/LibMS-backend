import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { Author } from '../value-objects/author.value-object';
import { ISBN } from '../value-objects/isbn.value-object';

export interface BookProps {
  isbn: ISBN;
  title: string;
  subtitle: string;
  originalTitle?: string;
  authors: Author[];
  publisher: string;
  publishedDate: Date;
  image: string;
  pageCount: number;
  overview?: string;
}

export class BookEntity extends AggregateRoot<BookProps> {
  constructor(props: BookProps) {
    super(props);
  }
}
