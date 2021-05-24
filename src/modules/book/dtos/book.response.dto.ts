import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Author } from 'src/interface-adapters/interfaces/book/author.interface';
import { Book } from 'src/interface-adapters/interfaces/book/book.interface';
import { Image } from 'src/interface-adapters/interfaces/book/image.interface';
import { BookEntity } from '../domain/entities/book.entity';
import { AuthorResponse } from './author.response.dto';
import { ImageResponse } from './image.response.dts';

export class BookResponse extends ResponseBase implements Book {
  constructor(book: BookEntity) {
    super(book);

    this.isbn = book.isbn.value;
    this.title = book.title;
    this.subtitle = book.title;
    this.originalTitle = book.originalTitle;
    this.authors = book.authors.map((author) => new AuthorResponse(author));
    this.publisher = book.publisher;
    this.publishedDate = book.publishedDate.value;
    this.image = new ImageResponse(book.image);
    this.pageCount = book.pageCount;
    this.overview = book.overview;
    this.copiesNbr = book.copiesNbr;
  }

  isbn: string;

  title: string;

  subtitle?: string;

  originalTitle?: string;

  authors: Author[];

  publisher: string;

  publishedDate: Date;

  image: Image;

  pageCount: number;

  overview?: string;

  copiesNbr: number;
}
