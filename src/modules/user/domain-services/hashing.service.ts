import { HashedPassword } from '../domain/value-objects/hashed-password.value-object';
import { Password } from '../domain/value-objects/password.value-object';

export interface HashingService {
  hash(password: Password): Promise<HashedPassword>;
  compare(password: Password, hashedPasswordd: string): boolean;
}
