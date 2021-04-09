import { ValueObject } from 'src/core/base-classes/value-object.base';
import { Guard } from 'src/core/guard';
import { ArgumentOutOfRangeException } from '@exceptions';

export interface FullNameProps {
  firstName: string;
  lastName: string;
}

export class FullName extends ValueObject<FullNameProps> {
  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  protected validate(props: FullNameProps): void {
    if (!Guard.lengthIsBetween(props.firstName, 2, 32)) {
      throw new ArgumentOutOfRangeException('firstName is out of range');
    }
    if (!Guard.lengthIsBetween(props.lastName, 2, 32)) {
      throw new ArgumentOutOfRangeException('lastName is out of range');
    }
  }
}
