import { ArgumentOutOfRangeException } from '@exceptions';
import {
  DomainPrimitive,
  ValueObject,
} from 'src/core/base-classes/value-object.base';
import { Guard } from 'src/core/guard';

export class ISBN extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate(props: DomainPrimitive<string>): void {
    if (
      !Guard.lengthIsBetween(props.value, 13, 13) &&
      !Guard.lengthIsBetween(props.value, 10, 10)
    ) {
      throw new ArgumentOutOfRangeException('ISBN is out range');
    }
  }
}
