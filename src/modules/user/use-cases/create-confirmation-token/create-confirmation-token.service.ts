import { ConflictException } from '@exceptions';
import { ConfirmationTokenRepositoryPort } from '@modules/user/database/confirmation-token/confirmation-token.repository.interface';
import { ConfirmationToken } from '@modules/user/domain/entities/confirmation-token.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ID } from 'src/core/value-objects/id.value-object';

export class CreateConfirmationTokenService {
  constructor(
    private readonly confirmationTokenRepo: ConfirmationTokenRepositoryPort,
  ) {}

  async create(user: UserEntity): Promise<ConfirmationToken> {
    if (user.isEmailVerified) {
      throw new ConflictException('User already verified');
    }

    const confirmationToken = new ConfirmationToken({
      value: ID.generate().value,
      user,
      expiresAt: new DateVO(Date.now() + 24 * 60 * 60 * 1000), // +24Hrs
    });

    const createdConfirmationToken = await this.confirmationTokenRepo.save(
      confirmationToken,
    );

    return createdConfirmationToken;
  }
}
