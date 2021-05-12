import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ImageOrmEntity } from '../../image/image.orm-entity';

const name = 'EZGV2472.JPG';
const imageMimeType = 'image/jpeg';
const image = new ImageOrmEntity();

define(ImageOrmEntity, (faker: typeof Faker) => {
  image.id = faker.random.uuid();
  image.name = name;
  image.size = faker.random.number({ min: 0, max: 1000000 });
  image.mimeType = imageMimeType;
  return image;
});
