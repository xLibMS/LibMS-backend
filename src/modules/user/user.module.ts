import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptHashingService } from 'src/infrastructure/services/bcrypt-hashing.service';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserRepository } from './database/user.repository';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticateUserHttpController } from './use-cases/authenticate-user/authenticate-user.http.controller';
import { CreateUserHttpController } from './use-cases/create-user/create-user.http.controller';
import { FindUserByEmailHttpController } from './use-cases/find-user-by-email/find-user-by-email.http.controller';
import { GetUserProfileHttpController } from './use-cases/get-user-profile/get-user-profile.http.controller';
import { RefreshTokenHttpController } from './use-cases/refresh-token/refresh-token.http.controller';
import { DeleteUserHttpController } from './use-cases/remove-user/delete-user.controller';
import {
  authUserProvider,
  createUserProvider,
  refreshTokenProvider,
  removeUserProvider,
} from './user.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
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
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    UserRepository,
    createUserProvider,
    removeUserProvider,
    BcryptHashingService,
    authUserProvider,
    refreshTokenProvider,
  ],
  exports: [AuthService, JwtModule],
})
export class UserModule {}
