import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptHashingService } from 'src/infrastructure/services/bcrypt-hashing.service';
import { ConfirmationTokenOrmEntity } from './database/confirmation-token/confirmation-token.orm-entity';
import { ConfirmationTokenRepository } from './database/confirmation-token/confirmation-token.repository';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserRepository } from './database/user.repository';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticateUserHttpController } from './use-cases/authenticate-user/authenticate-user.http.controller';
import { ConfirmUserEmailController } from './use-cases/confirm-user-email/confirm-user-email.http.controller';
import { ConfirmUserEmailService } from './use-cases/confirm-user-email/confirm-user-email.service';
import { CreateConfirmationTokenService } from './use-cases/create-confirmation-token/create-confirmation-token.service';
import { CreateUserHttpController } from './use-cases/create-user/create-user.http.controller';
import { FindUserByEmailHttpController } from './use-cases/find-user-by-email/find-user-by-email.http.controller';
import { GetUserProfileHttpController } from './use-cases/get-user-profile/get-user-profile.http.controller';
import { RefreshTokenHttpController } from './use-cases/refresh-token/refresh-token.http.controller';
import { DeleteUserHttpController } from './use-cases/remove-user/delete-user.controller';
import {
  authUserProvider,
  confirmUserEmailProvider,
  createConfirmationTokenProvider,
  createUserProvider,
  refreshTokenProvider,
  removeUserProvider,
} from './user.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity, ConfirmationTokenOrmEntity]),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [
    AuthenticateUserHttpController,
    CreateUserHttpController,
    DeleteUserHttpController,
    FindUserByEmailHttpController,
    RefreshTokenHttpController,
    GetUserProfileHttpController,
    ConfirmUserEmailController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    UserRepository,
    ConfirmationTokenRepository,
    createUserProvider,
    removeUserProvider,
    BcryptHashingService,
    authUserProvider,
    refreshTokenProvider,
    createConfirmationTokenProvider,
    CreateConfirmationTokenService,
    confirmUserEmailProvider,
    ConfirmUserEmailService,
  ],
  exports: [
    AuthService,
    JwtModule,
    createConfirmationTokenProvider,
    ConfirmationTokenRepository,
    CreateConfirmationTokenService,
  ],
})
export class UserModule {}
