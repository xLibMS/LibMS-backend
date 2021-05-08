export interface CreateImageProps {
  imageType: string;
  imageSize: number;
  imageName: string;
  storedImage: Buffer;
}

export class CreateImageCommand {
  constructor(props: CreateImageProps) {
    this.imageName = props.imageName;
    this.imageType = props.imageType;
    this.imageSize = props.imageSize;
    this.storedImage = props.storedImage;
  }

  readonly imageName: string;

  readonly imageType: string;

  readonly imageSize: number;

  readonly storedImage: Buffer;
}
