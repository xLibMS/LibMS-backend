// Concrete implementation of the email service
import { mailerConfig } from '@config/mailer.config';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailMessage } from '../dtos/email-message.dto';
import { EmailServicePort } from '../ports/email.service';

export class EmailServiceAdapter implements EmailServicePort {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger('email-service-adapter');
  }

  async sendEmail(emailMessage: EmailMessage): Promise<void> {
    const transporter = nodeMailer.createTransport(mailerConfig.transport);
    await transporter
      .sendMail({
        ...emailMessage,
        from: '"SMU Library" <smu.portaliss396@gmail.com>',
      })
      .then((onFullfilled: SMTPTransport.SentMessageInfo) => {
        this.logger.debug(`[Email sent] ${onFullfilled.messageId}`);
      })
      .catch((onrejected) => {
        this.logger.error(`[Email not sent] ${onrejected}`);
        throw new ServiceUnavailableException(onrejected);
      });
  }
}
