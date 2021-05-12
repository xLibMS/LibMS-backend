import { RepositoryPort } from 'src/core/ports/repository.ports';
import { AuthorEntity, AuthorProps } from '../../domain/entities/author.entity';

export type AuthorRepositoryPort = RepositoryPort<AuthorEntity, AuthorProps>;
