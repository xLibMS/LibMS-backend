import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import { AuthorEntity, AuthorProps } from '../../domain/entities/author.entity';
import { AuthorOrmEntity } from './author.orm-entity';
import { AuthorOrmMapper } from './author.orm-mapper';
import { AuthorRepositoryPort } from './author.repository.interface';

@Injectable()
export class AuthorRepository
  extends TypeormRepositoryBase<AuthorEntity, AuthorProps, AuthorOrmEntity>
  implements AuthorRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(AuthorOrmEntity)
    private readonly authorRepository: Repository<AuthorOrmEntity>,
  ) {
    super(
      authorRepository,
      new AuthorOrmMapper(AuthorEntity, AuthorOrmEntity),
      new Logger('author-repository'),
    );
  }

  protected prepareQuery(
    params: QueryParams<AuthorProps>,
  ): WhereCondition<AuthorOrmEntity> {
    const where: QueryParams<AuthorOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}
