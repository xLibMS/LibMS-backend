import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';

export interface AuthorProps {
  fullName: string;
}

export class AuthorEntity extends AggregateRoot<AuthorProps> {
  constructor(props: AuthorProps) {
    super(props);
  }

  get fullName(): string {
    return this.props.fullName;
  }
}
