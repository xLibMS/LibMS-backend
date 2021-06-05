import { DomainException } from '@exceptions';
import { ConfirmationTokenRepositoryPort } from '@modules/user/database/confirmation-token/confirmation-token.repository.interface';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { ConfirmUserEmailCommand } from './confirm-user-email.command';

export class ConfirmUserEmailService {
  constructor(
    private readonly confirmationTokenRepo: ConfirmationTokenRepositoryPort,
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async confirmUser(command: ConfirmUserEmailCommand): Promise<void> {
    const confirmationToken = await this.confirmationTokenRepo.findByValue(
      command.confirmationToken,
    );

    // Check if user already verified
    if (confirmationToken.user.isEmailVerified) {
      throw new DomainException('User already verified');
    }

    // If token expired, throw exception
    if (confirmationToken.hasExpired()) {
      throw new DomainException('Token has expired');
    }
    // If not, verify user and deleted token from database

    confirmationToken.user.verifyUser();

    await this.userRepo.save(confirmationToken.user);

    // await this.confirmationTokenRepo.delete(confirmationToken);
  }
}
