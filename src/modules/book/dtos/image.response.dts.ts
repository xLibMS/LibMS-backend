import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Image } from 'src/interface-adapters/interfaces/book/image.interface';
import { ImageEntity } from '../domain/entities/image.entity';

export class ImageResponse extends ResponseBase implements Image {
  constructor(image: ImageEntity) {
    super(image);

    this.name = image.name;
    this.mimeType = image.mimeType;
    this.size = image.size;
  }

  name: string;

  mimeType: string;

  size: number;
}
