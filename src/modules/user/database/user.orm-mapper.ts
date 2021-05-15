import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { UserEntity, UserProps } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.value-object';
import { FullName } from '../domain/value-objects/full-name.value-object';
import { Password } from '../domain/value-objects/password.value-object';
import { UniversityID } from '../domain/value-objects/university-id.value-object';
import { UserOrmEntity } from './user.orm-entity';

export class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
  protected toOrmProps(entity: UserEntity): OrmEntityProps<UserOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<UserOrmEntity> = {
      email: props.email.value,
      universityID: props.universityID.value,
      firstName: props.fullName.firstName,
      lastName: props.fullName.lastName,
      password: props.password.value,
      reservations: [],
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: UserOrmEntity): UserProps {
    const props: UserProps = {
      email: new Email(ormEntity.email),
      universityID: new UniversityID(ormEntity.universityID),
      fullName: new FullName({
        firstName: ormEntity.firstName,
        lastName: ormEntity.lastName,
      }),
      password: new Password(ormEntity.password),
    };
    return props;
  }
}
