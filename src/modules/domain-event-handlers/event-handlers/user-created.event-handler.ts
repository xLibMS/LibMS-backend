import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event';
import { CreateConfirmationTokenService } from '@modules/user/use-cases/create-confirmation-token/create-confirmation-token.service';
import { createConfirmationTokenSymbol } from '@modules/user/user.providers';
import { Inject } from '@nestjs/common';
import { DomainEventHandler, DomainEvents } from 'src/core/domain-events';

export class OnUserCreatedDomainEvent implements DomainEventHandler {
  constructor(
    @Inject(createConfirmationTokenSymbol)
    private readonly createConfirmationTokenService: CreateConfirmationTokenService,
  ) {}

  public listen(): void {
    DomainEvents.subscribe(
      UserCreatedDomainEvent,
      this.onUserCreated.bind(this),
    );
  }

  async onUserCreated(event: UserCreatedDomainEvent): Promise<void> {
    this.createConfirmationTokenService.create(event.user);
    /* Other side-effects can go here, or different event handlers can
    be created if needed */
  }
}
