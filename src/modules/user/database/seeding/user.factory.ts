import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UserOrmEntity } from '../user.orm-entity';

define(UserOrmEntity, (faker: typeof Faker) => {
  const user = new UserOrmEntity();
  user.id = faker.random.uuid();
  user.email = faker.internet.email();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.universityID = faker.random
    .number({ min: 1000000, max: 9999999 })
    .toString();
  user.password = faker.internet.password();
  return user;
});
