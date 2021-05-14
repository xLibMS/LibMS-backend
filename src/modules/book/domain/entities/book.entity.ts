import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { BookImage } from '../value-objects/image.value-object';
import { Author } from '../value-objects/author.value-object';
import { ISBN } from '../value-objects/isbn.value-object';

export interface BookProps {
  isbn: ISBN;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publisher: string;
  publishedDate: Date;
  image: BookImage;
  pageCount: number;
  overview?: string;
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

  get authors(): Author[] {
    return this.props.authors;
  }

  get publisher(): string {
    return this.props.publisher;
  }

  get publishedDate(): Date {
    return this.props.publishedDate;
  }

  get image(): BookImage {
    return this.props.image;
  }

  get pageCount(): number {
    return this.props.pageCount;
  }

  get overview(): string | undefined {
    return this.props.overview;
  }
}
