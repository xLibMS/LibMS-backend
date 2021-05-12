import {
  ImageEntity,
  ImageProps,
} from '@modules/book/domain/entities/image.entity';
import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { ImageOrmEntity } from './image.orm-entity';

export class ImageOrmMapper extends OrmMapper<ImageEntity, ImageOrmEntity> {
  protected toOrmProps(entity: ImageEntity): OrmEntityProps<ImageOrmEntity> {
    const props = entity.getPropsCopy();
    const ormProps: OrmEntityProps<ImageOrmEntity> = {
      name: props.name,
      mimeType: props.mimeType,
      size: props.size,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: ImageOrmEntity): ImageProps {
    const props: ImageProps = {
      name: ormEntity.name,
      size: ormEntity.size,
      mimeType: ormEntity.mimeType,
    };

    return props;
  }
}
