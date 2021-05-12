import { imageStorageConfig } from '@config/storage.config';
import { ArgumentInvalidException, ConflictException } from '@exceptions';
import { FileUploadService } from '@modules/book/domain-services/file-upload.service';
import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';

export class ImageUploadService implements FileUploadService {
  upload(image: Express.Multer.File): string {
    const currentDate = moment().format('YYYYMMDD-HHmmss');
    const file = path.parse(image.originalname.replace(/ /g, '_'));
    const fileName = `${file.name}_${currentDate}${file.ext}`;
    if (fileName !== path.basename(fileName)) {
      throw new ArgumentInvalidException('Unable to parse image name');
    }

    const filePath = path.join(imageStorageConfig.dist, fileName);
    const exists = fs.existsSync(filePath);
    if (exists) {
      throw new ConflictException('Image already exists');
    } else {
      fs.writeFileSync(filePath, image.buffer);
    }
    return fileName;
  }
}
