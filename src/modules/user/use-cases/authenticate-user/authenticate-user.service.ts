import {
  jwtAccessTokenConfig,
  jwtRefreshTokenConfig,
} from '@config/jwt.config';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { HashingService } from '@modules/user/domain-services/hashing.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import {
  JwtTokens,
  Token,
} from 'src/interface-adapters/interfaces/user/token.interface';

export class AuthService {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly hashService: HashingService,
  ) {}

  parseExpiration(expiresIn: string | number | undefined): number | undefined {
    if (!expiresIn) return;
    return typeof expiresIn === 'string' ? ms(expiresIn) : expiresIn;
  }

  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOneByEmailOrThrow(email);
    if (this.hashService.compare(new Password(pass), user.password.value)) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<JwtTokens> {
    const payload = { sub: user.id.value, email: user.email.value };
    const accessToken: Token = {
      token: this.jwtService.sign(payload, jwtAccessTokenConfig),
      expiresIn: this.parseExpiration(jwtAccessTokenConfig.expiresIn),
    };

    const refreshToken: Token = {
      token: this.jwtService.sign(payload, jwtRefreshTokenConfig),
      expiresIn: this.parseExpiration(jwtRefreshTokenConfig.expiresIn),
    };

    const tokens: JwtTokens = {
      accessToken,
      refreshToken,
    };
    return tokens;
  }
}
