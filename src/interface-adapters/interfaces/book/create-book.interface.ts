export interface Author {
  firstName: string;
  lastName: string;
  middleName?: string;
}
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
