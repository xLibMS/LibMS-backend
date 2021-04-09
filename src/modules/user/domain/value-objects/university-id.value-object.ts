import {
  DomainPrimitive,
  ValueObject,
} from 'src/core/base-classes/value-object.base';
import { ArgumentOutOfRangeException } from '@exceptions';
import { Guard } from 'src/core/guard';

export class UniversityID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 7, 7)) {
      throw new ArgumentOutOfRangeException('UniversityID');
    }
  }
}
