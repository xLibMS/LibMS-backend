import { Provider } from '@nestjs/common';
import { EmailServiceAdapter } from './infrastructure/email-service.adapter';
import { SendConfirmationEmailService } from './use-cases/send-confirmation-email/send-confirmation-email.service';

export const sendConfirmationEmailSymbol = Symbol('sendConfirmationEmail');

export const sendConfirmationEmailProvider: Provider = {
  provide: sendConfirmationEmailSymbol,
  useFactory: (
    emailService: EmailServiceAdapter,
  ): SendConfirmationEmailService =>
    new SendConfirmationEmailService(emailService),
  inject: [EmailServiceAdapter],
};
