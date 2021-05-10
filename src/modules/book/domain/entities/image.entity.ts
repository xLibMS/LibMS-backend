import { DomainException } from '@exceptions';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';

export interface ImageProps {
  imageName: string;
  imageType: string;
  imageSize: number;
}

export class ImageEntity extends AggregateRoot<ImageProps> {
  constructor(props: ImageProps) {
    super(props);
  }

  get imageName(): string {
    return this.props.imageName;
  }

  get imageType(): string {
    return this.props.imageType;
  }

  get imageSize(): number {
    return this.props.imageSize;
  }

  private validExtension(props: ImageProps): boolean {
    const mimeType: string[] = ['image/jpeg', 'image/png'];

    return mimeType.includes(props.imageType);
  }

  protected validate(props: ImageProps): void {
    // check of size (1Mb)
    if (props.imageSize / 1024 > 1024) {
      throw new DomainException('max file size exceeded');
    }
    // check file extension
    /* if (!this.validExtension(props)) {
      throw new DomainException('invalid file extension');
    } */
  }
}