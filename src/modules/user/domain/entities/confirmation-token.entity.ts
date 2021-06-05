import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ConfirmationTokenCreatedDomainEven } from '../events/confirmation-token-created.event';
import { UserEntity } from './user.entity';

export interface ConfirmationTokenProps {
  user: UserEntity;
  value: string;
  expiresAt: DateVO;
}

export class ConfirmationToken extends AggregateRoot<ConfirmationTokenProps> {
  constructor(props: ConfirmationTokenProps) {
    super(props);
    this.addEvent(
      new ConfirmationTokenCreatedDomainEven(
        this.id,
        this.props.user.email,
        this,
      ),
    );
  }

  hasExpired(): boolean {
    return DateVO.now().value >= this.props.expiresAt.value;
  }

  get value(): string {
    return this.props.value;
  }

  get expiresAt(): DateVO {
    return this.props.expiresAt;
  }

  get user(): UserEntity {
    return this.props.user;
  }
}
