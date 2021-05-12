import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { BookOrmEntity } from '../../book.orm-entity';

define(BookOrmEntity, (faker: typeof Faker) => {
  const year = faker.random.number({ min: 1900, max: 2022 });
  const month = faker.random.number({ min: 1, max: 12 });
  const day = faker.random.number({ min: 1, max: 30 });

  const book = new BookOrmEntity();
  book.id = faker.random.uuid().toString();
  book.isbn = faker.random
    .number({ min: 1000000000, max: 999999999999 })
    .toString();
  book.title = faker.name.title();
  book.publishedDate = new Date(year, month, day);
  book.publisher = `${faker.name.firstName()} ${faker.name.lastName()}`;
  book.pageCount = faker.random.number({ min: 1, max: 4000 });
  return book;
});
