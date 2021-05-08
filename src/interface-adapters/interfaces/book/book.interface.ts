import { Author } from './author.interface';
import { Image } from './image.interface';

export interface Book {
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
}
