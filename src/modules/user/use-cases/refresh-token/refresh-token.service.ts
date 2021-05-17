import { jwtAccessTokenConfig } from '@config/jwt.config';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/interface-adapters/interfaces/user/token.interface';
import { AuthService } from '../authenticate-user/authenticate-user.service';

export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async refresh(user: UserEntity): Promise<Token> {
    const payload = { sub: user.id, email: user.email };
    const token: Token = {
      token: this.jwtService.sign(payload, jwtAccessTokenConfig),
      expiresIn: this.authService.parseExpiration(
        jwtAccessTokenConfig.expiresIn,
      ),
    };
    return token;
  }
}
