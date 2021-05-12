import { imageStorageConfig } from '@config/storage.config';
import { ConflictException } from '@exceptions';
import { FileUploadService } from '@modules/book/domain-services/file-upload.service';
import * as fs from 'fs';
import * as path from 'path';

export class ImageUploadService implements FileUploadService {
  upload(image: Express.Multer.File): void {
    // check if file exists
    const filePath = path.join(imageStorageConfig.dist, image.originalname);
    const exists = fs.existsSync(filePath);
    if (exists) {
      throw new ConflictException('Image already exists');
    } else {
      fs.writeFileSync(
        `${imageStorageConfig.dist}/${image.originalname}`,
        image.buffer,
      );
    }
  }
}
