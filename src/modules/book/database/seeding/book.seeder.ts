import { Seeder, Factory } from 'typeorm-seeding';
import { BookOrmEntity } from '../book.orm-entity';

export default class CreateBooks implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(BookOrmEntity)().createMany(2);
  }
}
