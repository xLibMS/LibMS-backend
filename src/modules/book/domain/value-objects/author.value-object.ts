import { ValueObject } from 'src/core/base-classes/value-object.base';
import { Guard } from 'src/core/guard';
import { ArgumentOutOfRangeException } from '@exceptions';

export interface AuthorProps {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export class Author extends ValueObject<AuthorProps> {
  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  protected validate(props: AuthorProps): void {
    if (!Guard.lengthIsBetween(props.firstName, 2, 32)) {
      throw new ArgumentOutOfRangeException('firstName is out of range');
    }
    if (!Guard.lengthIsBetween(props.lastName, 2, 32)) {
      throw new ArgumentOutOfRangeException('lastName is out of range');
    }
  }
}
