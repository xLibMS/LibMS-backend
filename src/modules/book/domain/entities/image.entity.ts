import { DomainException } from '@exceptions';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';

export interface ImageProps {
  name: string;
  mimeType: string;
  size: number;
}

export class ImageEntity extends AggregateRoot<ImageProps> {
  constructor(props: ImageProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get mimeType(): string {
    return this.props.mimeType;
  }

  get size(): number {
    return this.props.size;
  }

  private validExtension(props: ImageProps): boolean {
    const mimeType: string[] = ['image/jpeg', 'image/png'];

    return mimeType.includes(props.mimeType);
  }

  protected validate(props: ImageProps): void {
    // check of size (1Mb)
    if (props.size / 1024 > 1024) {
      throw new DomainException('max file size exceeded');
    }
    // check file extension
    /* if (!this.validExtension(props)) {
      throw new DomainException('invalid file extension');
    } */
  }
}
