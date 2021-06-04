import { Author } from './author.interface';

export interface CreateBook {
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publisher: string;
  publishedDate: string;
  pageCount: number;
  overview?: string;
  copieCount: number;
}
