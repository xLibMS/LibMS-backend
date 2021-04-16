import { Seeder, Factory } from 'typeorm-seeding';
import { BookOrmEntity } from '../book.orm-entity';
import { bookSeeds } from './book.seeds';

export default class CreateBooks implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await Promise.all(
      bookSeeds.map((seed) => factory(BookOrmEntity)().create(seed)),
    );
  }
}
