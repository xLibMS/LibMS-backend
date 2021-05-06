import { Seeder, Factory } from 'typeorm-seeding';
import { UserOrmEntity } from '../user.orm-entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserOrmEntity)().createMany(2);
  }
}
