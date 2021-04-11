import { UserRepository } from '@modules/user/database/user.repository';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/interface-adapters/interfaces/user/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOneByEmailOrThrow(email);
    if (user.password.value === pass) {
      // SHOULD REMOVE PASSWORD BEFORE RETURNING USER
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<Token> {
    const payload = { sub: user.id.value, email: user.email.value };
    const token: Token = { accessToken: this.jwtService.sign(payload) };
    return token;
  }
}
