import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('reservations')
export class ReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'each reservation has unique identifier',
  })
  id: number | undefined;

  @Column({
    type: 'varchar',
  })
  date: Date | undefined;

  @Column({
    type: 'boolean',
    default: 1,
  })
  @ManyToMany(() => BookEntity, (book) => book.reservation)
  reservations: BookEntity[] | undefined;
}
