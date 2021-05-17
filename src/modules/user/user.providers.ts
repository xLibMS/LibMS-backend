import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptHashingService } from 'src/infrastructure/services/bcrypt-hashing.service';
import { UserRepository } from './database/user.repository';
import { AuthService } from './use-cases/authenticate-user/authenticate-user.service';
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
