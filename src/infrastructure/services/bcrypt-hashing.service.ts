import { HashingService } from '@modules/user/domain-services/hashing.service';
import { HashedPassword } from '@modules/user/domain/value-objects/hashed-password.value-object';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import * as bcrypt from 'bcrypt';

export class BcryptHashingService implements HashingService {
  async hash(password: Password): Promise<HashedPassword> {
    const hashedPassword: string = await bcrypt.hash(password.value, 10);
    return new HashedPassword(hashedPassword);
  }

  compare(password: Password, hashedPasswordd: string): boolean {
    return bcrypt.compareSync(password.value, hashedPasswordd);
  }
}
