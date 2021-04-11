import { jwtConfig } from '@config/jwt.config';
import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptHashingService } from 'src/infrastructure/services/bcrypt-hashing.service';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserRepository } from './database/user.repository';
import { JwtStrategy } from './use-cases/authenticate-user/jwt.strategy';
import { LocalStrategy } from './use-cases/authenticate-user/local.strategy';
import { AuthenticateUserHttpController } from './use-cases/authenticate-user/authenticate-user.http.controller';
import { CreateUserHttpController } from './use-cases/create-user/create-user.http.controller';
import { FindUserByEmailHttpController } from './use-cases/find-user-by-email/find-user-by-email.http.controller';
import { DeleteUserHttpController } from './use-cases/remove-user/delete-user.controller';
import { createUserProvider, removeUserProvider } from './user.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.register(jwtConfig),
    PassportModule,
  ],
  controllers: [
    AuthenticateUserHttpController,
    CreateUserHttpController,
    DeleteUserHttpController,
    FindUserByEmailHttpController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserRepository,
    createUserProvider,
    removeUserProvider,
    BcryptHashingService,
  ],
  exports: [AuthService, JwtModule],
})
export class UserModule {}
