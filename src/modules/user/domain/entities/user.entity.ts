import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { UserCreatedDomainEvent } from '../events/user-created.domain-event';
import { Email } from '../value-objects/email.value-object';
import { FullName } from '../value-objects/full-name.value-object';
import { HashedPassword } from '../value-objects/hashed-password.value-object';
import { Password } from '../value-objects/password.value-object';
import { UniversityID } from '../value-objects/university-id.value-object';

export interface UserProps {
  email: Email;
  universityID: UniversityID;
  fullName: FullName;
  password: Password;
}

export class UserEntity extends AggregateRoot<UserProps> {
  constructor(props: UserProps) {
    super(props);
    /* adding "UserCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action, like sending confirmation email, adding user
    to mailing list, send notification to slack etc */
    this.addEvent(new UserCreatedDomainEvent(this.id, this.props.email));
  }

  get email(): Email {
    return this.props.email;
  }

  get universityID(): UniversityID {
    return this.props.universityID;
  }

  get fullName(): FullName {
    return this.props.fullName;
  }

  get password(): Password {
    return this.props.password;
  }

  someBusinessLogic(): void {
    // TODO: add example business logic
  }

  hashPassword(hashedPassword: HashedPassword): void {
    this.props.password = new Password(hashedPassword.value);
  }

  static validate(props: UserProps): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
