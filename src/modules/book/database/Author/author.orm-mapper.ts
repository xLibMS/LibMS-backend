import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { AuthorEntity, AuthorProps } from '../../domain/entities/author.entity';
import { AuthorOrmEntity } from './author.orm-entity';

export class AuthorOrmMapper extends OrmMapper<AuthorEntity, AuthorOrmEntity> {
  protected toOrmProps(entity: AuthorEntity): OrmEntityProps<AuthorOrmEntity> {
    const props = entity.getPropsCopy();
    const ormProps: OrmEntityProps<AuthorOrmEntity> = {
      name: props.name,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: AuthorOrmEntity): AuthorProps {
    const props: AuthorProps = {
      name: ormEntity.name,
    };

    return props;
  }
}
