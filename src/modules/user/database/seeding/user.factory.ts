import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { emailDomainsWhitelist } from '@config/mailer.config';
import { UserOrmEntity } from '../user.orm-entity';

define(UserOrmEntity, (faker: typeof Faker) => {
  const emailProvider =
    emailDomainsWhitelist[
      Math.floor(Math.random() * emailDomainsWhitelist.length)
    ];
  const user = new UserOrmEntity();
  user.id = faker.random.uuid();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email(
    user.firstName.toLocaleLowerCase(),
    user.lastName.toLocaleLowerCase(),
    emailProvider,
  );
  user.universityID = faker.random
    .number({ min: 1000000, max: 9999999 })
    .toString();
  user.password = faker.internet.password();
  return user;
});
