import { BookImage } from '../domain/value-objects/image.value-object';

export interface FileUplaodService {
  upload(file: Buffer, image: BookImage): void;
}
