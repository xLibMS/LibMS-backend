import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';

config();

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT as string, 10),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { ciphers: 'SSLv3' },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: `${process.cwd()}/templates/`,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
