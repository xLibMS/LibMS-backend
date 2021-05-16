import {
  FullName,
  FullNameProps,
} from '@modules/user/domain/value-objects/full-name.value-object';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { UniversityID } from '@modules/user/domain/value-objects/university-id.value-object';
import { Roles } from 'src/interface-adapters/enum/roles.enum';
import { Email } from '../../domain/value-objects/email.value-object';

export interface CreateUserProps {
  email: string;
  universityID: string;
  fullName: FullNameProps;
  password: string;
  role: Roles;
}

export class CreateUserCommand {
  constructor(props: CreateUserProps) {
    this.email = new Email(props.email);
    this.universityID = new UniversityID(props.universityID);
    this.fullName = new FullName(props.fullName);
    this.password = new Password(props.password);
    this.role = props.role;
  }

  readonly email: Email;

  readonly universityID: UniversityID;

  readonly fullName: FullName;

  readonly password: Password;

  readonly role: Roles;
}
