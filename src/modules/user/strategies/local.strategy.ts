import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Inject } from '@nestjs/common';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { authUserSymbol } from '@modules/user/user.providers';
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
    return user;
  }
}
