import { AuthorResponse } from './author.response.dts';

export class AuthorsResponse {
  constructor(authors: AuthorResponse[]) {
    this.authors = authors;
  }

  authors: AuthorResponse[];
}
