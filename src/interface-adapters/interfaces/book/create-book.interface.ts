import { Author } from './author.interface';
import { Image } from './image.interface';

export interface CreateBook {
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publisher: string;
  publishedDate: string;
  image: string;
  pageCount: number;
  overview?: string;
}
