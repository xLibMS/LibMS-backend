/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { jwtRefreshStrategyConfig } from '@config/jwt.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/interface-adapters/interfaces/user/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super(jwtRefreshStrategyConfig);
  }

  async validate(
    payload: TokenPayload,
  ): Promise<{ id: string; email: string }> {
    const user = { id: payload.sub, email: payload.email };
    return user;
  }
}
