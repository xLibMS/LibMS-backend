import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';
import { Author } from './author.orm-subdoc';
import { BookImage } from './image.orm-subdoc';

@Entity('book')
export class BookOrmEntity extends TypeormEntityBase {
  constructor(props?: BookOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  isbn10?: string;

  @Column({ unique: true })
  isbn13!: string;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  originalTitle?: string;

  @Column(() => Author)
  authors!: Author[];

  @Column(() => BookImage)
  image!: BookImage;

  @Column()
  publisher!: string;

  @Column()
  publishedDate!: Date;

  @Column()
  pageCount!: number;

  @Column()
  overview?: string;
}
