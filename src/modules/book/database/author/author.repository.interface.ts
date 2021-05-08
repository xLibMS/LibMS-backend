import { RepositoryPort } from 'src/core/ports/repository.ports';
import { AuthorEntity, AuthorProps } from '../../domain/entities/author.entity';

export interface AuthorRepositoryPort
  extends RepositoryPort<AuthorEntity, AuthorProps> {
  test: string;
}
