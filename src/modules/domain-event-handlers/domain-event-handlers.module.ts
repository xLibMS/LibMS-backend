import { EmailServiceAdapter } from '@modules/notifications/infrastructure/email-service.adapter';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { sendConfirmationEmailProvider } from '@modules/notifications/notifications.providers';
import { SendConfirmationEmailService } from '@modules/notifications/use-cases/send-confirmation-email/send-confirmation-email.service';
import { ConfirmationTokenOrmEntity } from '@modules/user/database/confirmation-token/confirmation-token.orm-entity';
import { ConfirmationTokenRepository } from '@modules/user/database/confirmation-token/confirmation-token.repository';
import { CreateConfirmationTokenService } from '@modules/user/use-cases/create-confirmation-token/create-confirmation-token.service';
import { UserModule } from '@modules/user/user.module';
import { createConfirmationTokenProvider } from '@modules/user/user.providers';
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { domainEventHandlers } from '.';
import { userCreatedEventHandlerProvider } from './domain-event-handlers.providers';
import { OnConfirmationTokenCreatedEvent } from './event-handlers/confirmation-token-created.event-handler';
import { OnUserCreatedDomainEvent } from './event-handlers/user-created.event-handler';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ConfirmationTokenOrmEntity]),
    NotificationsModule,
  ],
  providers: [
    ConfirmationTokenRepository,
    createConfirmationTokenProvider,
    userCreatedEventHandlerProvider,
    CreateConfirmationTokenService,
    OnUserCreatedDomainEvent,
    OnConfirmationTokenCreatedEvent,
    SendConfirmationEmailService,
    sendConfirmationEmailProvider,
    EmailServiceAdapter,
  ],
})
export class DomainEventHandlersModule implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    // Context: doing this to avoid polluting the core (i.e. application layer when domain even handlers exist)
    // with infrastructure implementation.
    // ---------------------------------------
    // Getting the injected instance from the DI container
    // Need this to initialize the DomainEventHandlers
    domainEventHandlers.forEach((domainEventHandler) =>
      this.moduleRef.get(domainEventHandler).listen(),
    );
  }
}
