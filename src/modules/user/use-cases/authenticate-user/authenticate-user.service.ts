import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { HashingService } from '@modules/user/domain-services/hashing.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/interface-adapters/interfaces/user/token.interface';

export class AuthService {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly hashService: HashingService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOneByEmailOrThrow(email);
    if (this.hashService.compare(new Password(pass), user.password.value)) {
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
