import { EmailMessage } from '../dtos/email-message.dto';

export interface EmailServicePort {
  sendEmail(emailMessage: EmailMessage): Promise<void>;
}
