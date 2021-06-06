import { ConflictException } from '@exceptions';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { HashingService } from '@modules/user/domain-services/hashing.service';
import { HashedPassword } from '@modules/user/domain/value-objects/hashed-password.value-object';
import { ID } from 'src/core/value-objects/id.value-object';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserCommand } from './create-user.command';

export class CreateUserService {
  constructor(
    // no direct dependency on a repository, instead depends on a port
    private readonly userRepo: UserRepositoryPort,
    private readonly hashService: HashingService,
  ) {}

  async createUser(command: CreateUserCommand): Promise<ID> {
    // user uniqueness guard
    if (
      (await this.userRepo.existsByEmail(command.email.value)) ||
      (await this.userRepo.existsByUniID(command.universityID.value))
    ) {
      throw new ConflictException('User already exists');
    }

    const user = new UserEntity(command);

    const hashedPassword: HashedPassword = await this.hashService.hash(
      user.password,
    );

    user.hashPassword(hashedPassword);

    const created = await this.userRepo.save(user);

    return created.id;
  }
}
