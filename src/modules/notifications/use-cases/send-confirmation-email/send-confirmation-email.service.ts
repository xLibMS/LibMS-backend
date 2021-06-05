import { EmailMessage } from '@modules/notifications/dtos/email-message.dto';
import { EmailServicePort } from '../../ports/email.service';

export class SendConfirmationEmailService {
  constructor(private readonly emailService: EmailServicePort) {}

  async sendEmail(emailMessage: EmailMessage): Promise<void> {
    await this.emailService.sendEmail(emailMessage);
  }
}
