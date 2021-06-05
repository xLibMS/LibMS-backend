import { DomainEvent } from 'src/core/domain-events';
import { ID } from 'src/core/value-objects/id.value-object';
import { UserEntity } from '../entities/user.entity';

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly user: UserEntity,
  ) {
    super();
  }
}
