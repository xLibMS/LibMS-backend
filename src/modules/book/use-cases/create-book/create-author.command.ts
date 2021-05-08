import { Author } from 'src/interface-adapters/interfaces/book/author.interface';

export class CreateAuthorsCommand {
  constructor(props: Author[]) {
    this.authors = props;
  }

  readonly authors: Author[];
}
