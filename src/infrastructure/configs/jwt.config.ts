import { JwtSignOptions } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

config();

export const jwtAccessTokenConfig: JwtSignOptions = {
  secret: process.env.APP_SECRET,
  expiresIn: '1h',
};

export const jwtRefreshTokenConfig: JwtSignOptions = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: '24h',
};

export const jwtAccessStrategyConfig: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.APP_SECRET,
};

export const jwtRefreshStrategyConfig: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.REFRESH_TOKEN_SECRET,
};
