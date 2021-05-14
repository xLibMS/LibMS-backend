import { jwtAccessStrategyConfig } from '@config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/interface-adapters/interfaces/user/token-payload.interface';
import { UserRepository } from '../database/user.repository';
import { UserRepositoryPort } from '../database/user.repository.interface';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserRepository) private userRepo: UserRepositoryPort) {
    super(jwtAccessStrategyConfig);
  }

  async validate(payload: TokenPayload): Promise<UserEntity> {
    const user = this.userRepo.findOneByIdOrThrow(payload.sub);
    return user;
  }
}
