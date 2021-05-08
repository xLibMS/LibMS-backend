import {
  ImageEntity,
  ImageProps,
} from '@modules/book/domain/entities/image.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import { ImageOrmEntity } from './image.orm-entity';
import { ImageOrmMapper } from './image.orm-mapper';
import { ImageRepositoryPort } from './image.repository.interface';

@Injectable()
export class ImageRepository
  extends TypeormRepositoryBase<ImageEntity, ImageProps, ImageOrmEntity>
  implements ImageRepositoryPort {
  protected relations: string[] = [];

  test = '';

  constructor(
    @InjectRepository(ImageOrmEntity)
    private readonly imageRepository: Repository<ImageOrmEntity>,
  ) {
    super(
      imageRepository,
      new ImageOrmMapper(ImageEntity, ImageOrmEntity),
      new Logger('image-repository'),
    );
  }

  protected prepareQuery(
    params: QueryParams<ImageProps>,
  ): WhereCondition<ImageOrmEntity> {
    const where: QueryParams<ImageOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}
