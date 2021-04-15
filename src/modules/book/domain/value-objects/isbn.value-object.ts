import { ArgumentOutOfRangeException } from '@exceptions';
import { ValueObject } from 'src/core/base-classes/value-object.base';
import { Guard } from 'src/core/guard';

export interface ISBNProps {
  isbn10: string;
  isbn13: string;
}
export class ISBN extends ValueObject<ISBNProps> {
  get isbn10(): string {
    return this.props.isbn10;
  }

  get isbn13(): string {
    return this.props.isbn13;
  }

  protected validate(props: ISBNProps): void {
    if (
      !Guard.lengthIsBetween(props.isbn10, 10, 10) ||
      !Guard.lengthIsBetween(props.isbn13, 13, 13)
    ) {
      throw new ArgumentOutOfRangeException('ISBN is out range');
    }
  }
}
