import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Author } from 'src/interface-adapters/interfaces/book/author.interface';
import { AuthorEntity } from '../domain/entities/author.entity';

export class AuthorResponse extends ResponseBase implements Author {
  constructor(author: AuthorEntity) {
    super(author);

    this.name = author.name;
  }

  name: string;
}
