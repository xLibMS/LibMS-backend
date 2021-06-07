import { sendConfirmationEmailSymbol } from '@modules/notifications/notifications.providers';
import { SendConfirmationEmailService } from '@modules/notifications/use-cases/send-confirmation-email/send-confirmation-email.service';
import { ConfirmationTokenCreatedDomainEvent } from '@modules/user/domain/events/confirmation-token-created.event';
import { Inject } from '@nestjs/common';
import { config } from 'dotenv';
import { DomainEventHandler, DomainEvents } from 'src/core/domain-events';

config();

export class OnConfirmationTokenCreatedEvent implements DomainEventHandler {
  constructor(
    @Inject(sendConfirmationEmailSymbol)
    private readonly confimrationService: SendConfirmationEmailService,
  ) {}

  listen(): void {
    DomainEvents.subscribe(
      ConfirmationTokenCreatedDomainEvent,
      this.onConfirmationTokenCreated.bind(this),
    );
  }

  async onConfirmationTokenCreated(
    event: ConfirmationTokenCreatedDomainEvent,
  ): Promise<void> {
    await this.confimrationService.sendEmail({
      to: event.email.value,
      subject: 'Account Email Verification',
      // TODO: - Find a way to use email templates
      //       - Find a better way to include urls
      text: `Verification Link: ${process.env.CORS_ORIGIN}/confirm/${event.confirmationToken.value}`,
    });
  }
}
