import { OnConfirmationTokenCreatedEvent } from './event-handlers/confirmation-token-created.event-handler';
import { OnUserCreatedDomainEvent } from './event-handlers/user-created.event-handler';

export const domainEventHandlers: string[] = [
  OnUserCreatedDomainEvent.name,
  OnConfirmationTokenCreatedEvent.name,
];
