import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'src/interface-adapters/interfaces/user/token-payload.interface';
import { jwtStrategyConfig } from '@config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(jwtStrategyConfig);
  }

  async validate(
    payload: TokenPayload,
  ): Promise<{ id: string; email: string }> {
    const user = { id: payload.sub, email: payload.email };
    return user;
  }
}
