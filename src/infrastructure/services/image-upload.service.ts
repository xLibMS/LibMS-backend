import { FileUplaodService } from '@modules/book/domain-services/file-upload.service';
import * as fs from 'fs';
import { imageStorageConfig } from '@config/storage.config';
import { BookImage } from '@modules/book/domain/value-objects/image.value-object';

export class ImageUploadService implements FileUplaodService {
  upload(file: Buffer, image: BookImage): void {
    fs.writeFileSync(`${imageStorageConfig.dist}/${image.imageName}`, file);
  }
}
