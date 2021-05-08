import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';

export interface AuthorProps {
  name: string;
}

export class AuthorEntity extends AggregateRoot<AuthorProps> {
  constructor(props: AuthorProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }
}
