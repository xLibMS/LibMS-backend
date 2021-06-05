import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { authUserSymbol } from '@modules/user/user.providers';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../use-cases/authenticate-user/authenticate-user.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(authUserSymbol) private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email is not verified');
    }
    return user;
  }
}
