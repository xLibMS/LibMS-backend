import { sendConfirmationEmailSymbol } from '@modules/notifications/notifications.providers';
import { SendConfirmationEmailService } from '@modules/notifications/use-cases/send-confirmation-email/send-confirmation-email.service';
import { ConfirmationTokenCreatedDomainEven } from '@modules/user/domain/events/confirmation-token-created.event';
import { Inject } from '@nestjs/common';
import { DomainEventHandler, DomainEvents } from 'src/core/domain-events';

export class OnConfirmationTokenCreatedEvent implements DomainEventHandler {
  constructor(
    @Inject(sendConfirmationEmailSymbol)
    private readonly confimrationService: SendConfirmationEmailService,
  ) {}

  listen(): void {
    DomainEvents.subscribe(
      ConfirmationTokenCreatedDomainEven,
      this.onConfirmationTokenCreated.bind(this),
    );
  }

  async onConfirmationTokenCreated(
    event: ConfirmationTokenCreatedDomainEven,
  ): Promise<void> {
    await this.confimrationService.sendEmail({
      to: event.email.value,
      subject: 'Account Email Verification',
      // TODO: - Find a way to use email templates
      //       - Find a better way to include urls
      text: `Verification Link: http:/localhost:3000/api/confirmation-token/${event.confirmationToken.value}/confirm`,
    });
  }
}
