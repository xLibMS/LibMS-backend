import {
  DomainPrimitive,
  ValueObject,
} from 'src/core/base-classes/value-object.base';

export class HashedPassword extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected validate(props: DomainPrimitive<string>): void {}
}
