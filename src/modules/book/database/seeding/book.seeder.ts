/* eslint-disable no-param-reassign */
import { Seeder, Factory } from 'typeorm-seeding';
import { AuthorOrmEntity } from '../author/author.orm-entity';
import { BookOrmEntity } from '../book.orm-entity';
import { ImageOrmEntity } from '../image/image.orm-entity';

export default class CreateBooks implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(BookOrmEntity)()
      .map(async (book: BookOrmEntity) => {
        const authors: AuthorOrmEntity[] = await factory(
          AuthorOrmEntity,
        )().createMany(1);
        const image: ImageOrmEntity = await factory(ImageOrmEntity)().create();

        book.authors = authors;
        book.image = image;
        return book;
      })
      .createMany(4);
  }
}
