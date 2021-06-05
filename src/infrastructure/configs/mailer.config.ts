import { MailerOptions } from '@nestjs-modules/mailer';
import { config } from 'dotenv';

config();

export const emailDomainsWhitelist: Array<string> = [
  'medtech.tn',
  'msb.tn',
  'smu.tn',
];

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT as string, 10),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    // tls: { ciphers: 'SSLv3' },
  },
  defaults: {},
  // template: {
  //   dir: `${process.cwd()}/templates/`,
  //   adapter: new HandlebarsAdapter(),
  //   options: {
  //     strict: true,
  //   },
  // },
};
