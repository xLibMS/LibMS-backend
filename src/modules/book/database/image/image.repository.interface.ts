import {
  ImageEntity,
  ImageProps,
} from '@modules/book/domain/entities/image.entity';
import { RepositoryPort } from 'src/core/ports/repository.ports';

export interface ImageRepositoryPort
  extends RepositoryPort<ImageEntity, ImageProps> {
  test: string;
}
