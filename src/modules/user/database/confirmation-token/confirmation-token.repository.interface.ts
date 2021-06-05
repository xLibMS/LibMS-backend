import {
  ConfirmationToken,
  ConfirmationTokenProps,
} from '@modules/user/domain/entities/confirmation-token.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { RepositoryPort } from 'src/core/ports/repository.ports';

export interface ConfirmationTokenRepositoryPort
  extends RepositoryPort<ConfirmationToken, ConfirmationTokenProps> {
  findByUser(user: UserEntity): Promise<ConfirmationToken>;
  findByValue(value: string): Promise<ConfirmationToken>;
}
