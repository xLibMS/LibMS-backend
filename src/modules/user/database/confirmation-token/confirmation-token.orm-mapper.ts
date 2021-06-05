import {
  ConfirmationToken,
  ConfirmationTokenProps,
} from '@modules/user/domain/entities/confirmation-token.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { DateVO } from 'src/core/value-objects/date.value-object';
import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { UserOrmEntity } from '../user.orm-entity';
import { UserOrmMapper } from '../user.orm-mapper';
import { ConfirmationTokenOrmEntity } from './confirmation-token.orm-entity';

export class ConfirmationTokenOrmMapper extends OrmMapper<
  ConfirmationToken,
  ConfirmationTokenOrmEntity
> {
  protected toOrmProps(
    entity: ConfirmationToken,
  ): OrmEntityProps<ConfirmationTokenOrmEntity> {
    const props = entity.getPropsCopy();
    const userOrmMapper = new UserOrmMapper(UserEntity, UserOrmEntity);
    const user = userOrmMapper.toOrmEntity(props.user);

    const ormProps: OrmEntityProps<ConfirmationTokenOrmEntity> = {
      value: props.value,
      expiresAt: props.expiresAt.value,
      user,
    };

    return ormProps;
  }

  protected toDomainProps(
    ormEntity: ConfirmationTokenOrmEntity,
  ): ConfirmationTokenProps {
    const userOrmMapper: UserOrmMapper = new UserOrmMapper(
      UserEntity,
      UserOrmEntity,
    );
    const user = userOrmMapper.toDomainEntity(ormEntity.user);
    const props: ConfirmationTokenProps = {
      value: ormEntity.value,
      expiresAt: new DateVO(ormEntity.expiresAt),
      user,
    };

    return props;
  }
}
