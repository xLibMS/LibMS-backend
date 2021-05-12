export interface CreateImageProps {
  mimeType: string;
  size: number;
  name: string;
  storedImage: Buffer;
}

export class CreateImageCommand {
  constructor(props: CreateImageProps) {
    this.name = props.name;
    this.mimeType = props.mimeType;
    this.size = props.size;
    this.storedImage = props.storedImage;
  }

  readonly name: string;

  readonly mimeType: string;

  readonly size: number;

  readonly storedImage: Buffer;
}
