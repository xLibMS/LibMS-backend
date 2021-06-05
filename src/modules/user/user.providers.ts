import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptHashingService } from 'src/infrastructure/services/bcrypt-hashing.service';
import { ConfirmationTokenRepository } from './database/confirmation-token/confirmation-token.repository';
import { ConfirmationTokenRepositoryPort } from './database/confirmation-token/confirmation-token.repository.interface';
import { UserRepository } from './database/user.repository';
import { AuthService } from './use-cases/authenticate-user/authenticate-user.service';
import { ConfirmUserEmailService } from './use-cases/confirm-user-email/confirm-user-email.service';
import { CreateConfirmationTokenService } from './use-cases/create-confirmation-token/create-confirmation-token.service';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { RefreshTokenService } from './use-cases/refresh-token/refresh-token.service';
import { DeleteUserService } from './use-cases/remove-user/delete-user.service';

/* Constructing providers to avoid having framework decorators
   in application core. */
export const authUserSymbol = Symbol('authUser');

export const authUserProvider: Provider = {
  provide: authUserSymbol,
  useFactory: (
    userRepo: UserRepository,
    jwtService: JwtService,
    hashService: BcryptHashingService,
  ): AuthService => new AuthService(userRepo, jwtService, hashService),
  inject: [UserRepository, JwtService, BcryptHashingService],
};

export const createUserSymbol = Symbol('createUser');

export const createUserProvider: Provider = {
  provide: createUserSymbol,
  useFactory: (
    userRepo: UserRepository,
    hashService: BcryptHashingService,
  ): CreateUserService => new CreateUserService(userRepo, hashService),
  inject: [UserRepository, BcryptHashingService],
};

export const refreshTokenSymbol = Symbol('refreshToken');

export const refreshTokenProvider: Provider = {
  provide: refreshTokenSymbol,
  useFactory: (
    jwtService: JwtService,
    authService: AuthService,
  ): RefreshTokenService => new RefreshTokenService(jwtService, authService),
  inject: [JwtService, AuthService],
};

export const removeUserSymbol = Symbol('removeUser');

export const removeUserProvider: Provider = {
  provide: removeUserSymbol,
  useFactory: (userRepo: UserRepository): DeleteUserService =>
    new DeleteUserService(userRepo),
  inject: [UserRepository],
};

export const createConfirmationTokenSymbol = Symbol('createConfirmationToken');

export const createConfirmationTokenProvider: Provider = {
  provide: createConfirmationTokenSymbol,
  useFactory: (
    tokenRepo: ConfirmationTokenRepository,
  ): CreateConfirmationTokenService =>
    new CreateConfirmationTokenService(tokenRepo),
  inject: [ConfirmationTokenRepository],
};

export const confirmUserEmailSymbol = Symbol('confirmUserEmail');

export const confirmUserEmailProvider: Provider = {
  provide: confirmUserEmailSymbol,
  useFactory: (
    tokenRepo: ConfirmationTokenRepositoryPort,
    userRepo: UserRepository,
  ) => new ConfirmUserEmailService(tokenRepo, userRepo),

  inject: [ConfirmationTokenRepository, UserRepository],
};
