import { ReservationOrmEntity } from '@modules/reservation/database/reservation.orm-entity';
import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AuthorOrmEntity } from './author/author.orm-entity';
import { ImageOrmEntity } from './image/image.orm-entity';

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

  @ManyToMany(() => AuthorOrmEntity, { cascade: ['insert'] })
  @JoinTable()
  authors!: AuthorOrmEntity[];

  @OneToOne(() => ImageOrmEntity, { cascade: ['insert'] })
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

  @OneToMany(() => ReservationOrmEntity, (reservations) => reservations.book)
  reservations!: ReservationOrmEntity[];
}
