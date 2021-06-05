import { Module } from '@nestjs/common';
import { EmailServiceAdapter } from './infrastructure/email-service.adapter';
import { sendConfirmationEmailProvider } from './notifications.providers';

@Module({
  providers: [EmailServiceAdapter, sendConfirmationEmailProvider],
})
export class NotificationsModule {}
