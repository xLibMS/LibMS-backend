import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { AuthorOrmEntity } from './Author/author.orm-entity';
import { ImageOrmEntity } from './Image/image.orm-entity';

@Entity('book')
export class BookOrmEntity extends TypeormEntityBase {
  constructor(props?: BookOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  isbn!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column({ nullable: true })
  originalTitle?: string;

  @ManyToMany(() => AuthorOrmEntity)
  @JoinTable()
  authors!: AuthorOrmEntity[];

  @OneToOne(() => ImageOrmEntity)
  @JoinColumn()
  image!: ImageOrmEntity;

  @Column()
  publisher!: string;

  @Column()
  publishedDate!: Date;

  @Column()
  pageCount!: number;

  @Column({ nullable: true })
  overview?: string;
}
