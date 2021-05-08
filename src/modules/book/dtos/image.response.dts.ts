import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { Image } from 'src/interface-adapters/interfaces/book/image.interface';
import { ImageEntity } from '../domain/entities/image.entity';

export class ImageResponse extends ResponseBase implements Image {
  constructor(image: ImageEntity) {
    super(image);

    this.imageName = image.imageName;
    this.imageType = image.imageType;
    this.imageSize = image.imageSize;
  }

  imageName: string;

  imageType: string;

  imageSize: number;
}
