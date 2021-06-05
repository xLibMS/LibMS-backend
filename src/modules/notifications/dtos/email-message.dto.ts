import { IsEmail, IsString } from 'class-validator';

// This is needed since we need to define a DTO to pass data to the email adapter

export class EmailMessage {
  @IsEmail()
  to!: string;

  @IsString()
  subject!: string;

  @IsString()
  text?: string;

  @IsString()
  html?: string;
}
