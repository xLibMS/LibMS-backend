import { Column } from 'typeorm';

export class BookImage {
  @Column()
  imageName!: string;

  imageType!: string;

  imageSize!: number;

  constructor(imageName: string, imageType: string, imageSize: number) {
    this.imageName = imageName;
    this.imageType = imageType;
    this.imageSize = imageSize;
  }
}
