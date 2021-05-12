export interface FileUploadService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload(file: Express.Multer.File): void;
}
