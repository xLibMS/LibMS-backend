import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

config();

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.APP_SECRET,
  signOptions: { expiresIn: '24h' },
};

export const jwtStrategyConfig: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.APP_SECRET,
};
