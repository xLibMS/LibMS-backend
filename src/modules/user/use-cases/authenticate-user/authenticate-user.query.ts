import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { Email } from '../../domain/value-objects/email.value-object';

export interface AuthenticateUserProps {
  email: string;
  password: string;
}

export class AuthenticateUserQuery {
  constructor(props: AuthenticateUserProps) {
    this.email = new Email(props.email);
    this.password = new Password(props.password);
  }

  readonly email: Email;

  readonly password: Password;
}
