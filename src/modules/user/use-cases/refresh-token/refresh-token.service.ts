import { jwtAccessTokenConfig } from '@config/jwt.config';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/interface-adapters/interfaces/user/token.interface';

export class RefreshTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async refresh(user: UserEntity): Promise<Token> {
    const payload = { sub: user.id, email: user.email };
    const token: Token = {
      accessToken: this.jwtService.sign(payload, jwtAccessTokenConfig),
    };
    return token;
  }
}
