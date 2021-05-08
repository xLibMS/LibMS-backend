import { FileUplaodService } from '@modules/book/domain-services/file-upload.service';
import * as fs from 'fs';
import { imageStorageConfig } from '@config/storage.config';
import { ConflictException } from '@exceptions';
import { ImageEntity } from '@modules/book/domain/entities/image.entity';

export class ImageUploadService implements FileUplaodService {
  upload(file: Buffer, image: ImageEntity): void {
    // check if file exists
    const filePath = `${imageStorageConfig.dist}/${image.imageName}`;
    const exists = fs.existsSync(filePath);
    if (exists) {
      throw new ConflictException('File already exists');
    } else {
      fs.writeFileSync(`${imageStorageConfig.dist}/${image.imageName}`, file);
    }
  }
}
