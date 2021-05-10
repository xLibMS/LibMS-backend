import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { ImageOrmEntity } from '../../image/image.orm-entity';

const imageName = 'EZGV2472.JPG';
const imageType = 'image/jpeg';
const image = new ImageOrmEntity();

define(ImageOrmEntity, (faker: typeof Faker) => {
  image.id = faker.random.uuid();
  image.imageName = imageName;
  image.imageSize = faker.random.number({ min: 0, max: 1000000 });
  image.imageType = imageType;
  return image;
});
