import { AuthorResponse } from './author.response.dto';

export class AuthorsResponse {
  constructor(authors: AuthorResponse[]) {
    this.authors = authors;
  }

  authors: AuthorResponse[];
}
