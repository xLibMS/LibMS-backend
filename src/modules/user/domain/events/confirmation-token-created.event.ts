import { DomainEvent } from 'src/core/domain-events';
import { ID } from 'src/core/value-objects/id.value-object';
import { ConfirmationToken } from '../entities/confirmation-token.entity';
import { Email } from '../value-objects/email.value-object';

export class ConfirmationTokenCreatedDomainEven extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly email: Email,
    public readonly confirmationToken: ConfirmationToken,
  ) {
    super();
  }
}
