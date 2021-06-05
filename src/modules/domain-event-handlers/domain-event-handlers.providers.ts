import { SendConfirmationEmailService } from '@modules/notifications/use-cases/send-confirmation-email/send-confirmation-email.service';
import { CreateConfirmationTokenService } from '@modules/user/use-cases/create-confirmation-token/create-confirmation-token.service';
import { Provider } from '@nestjs/common';
import { OnConfirmationTokenCreatedEvent } from './event-handlers/confirmation-token-created.event-handler';
import { OnUserCreatedDomainEvent } from './event-handlers/user-created.event-handler';

export const userCreatedEventHandlerSymbol = Symbol('userCreatedEventHandler');

export const userCreatedEventHandlerProvider: Provider = {
  provide: userCreatedEventHandlerSymbol,
  useFactory: (
    createConfirmationTokenService: CreateConfirmationTokenService,
  ): OnUserCreatedDomainEvent =>
    new OnUserCreatedDomainEvent(createConfirmationTokenService),
  inject: [CreateConfirmationTokenService],
};

export const confirmationTokenCreatedEventHandlerSymbol = Symbol(
  'confirmationTokenCreatedEventHandler',
);

export const confirmationTokenCreatedEventHandlerProvider: Provider = {
  provide: confirmationTokenCreatedEventHandlerSymbol,
  useFactory: (sendConfirmationEmailService: SendConfirmationEmailService) =>
    new OnConfirmationTokenCreatedEvent(sendConfirmationEmailService),
  inject: [SendConfirmationEmailService],
};
