import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { AuthorOrmEntity } from '../../author/author.orm-entity';

define(AuthorOrmEntity, (faker: typeof Faker) => {
  const authors = new AuthorOrmEntity();
  authors.id = faker.random.uuid().toString();
  authors.fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
  return authors;
});
