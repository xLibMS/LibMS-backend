export interface FileUploadService {
  upload(file: Express.Multer.File): string;
}
