import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('reservation')
export class ReservationOrmEntity extends TypeormEntityBase {
  constructor(props?: ReservationOrmEntity) {
    super(props);
  }

  @ManyToOne(() => BookOrmEntity, (book) => book.reservations)
  book!: BookOrmEntity;

  @ManyToOne(() => UserOrmEntity, (user) => user.reservations)
  user!: UserOrmEntity;

  @Column()
  reservedAt!: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatusTypes,
    default: ReservationStatusTypes.pending,
  })
  reservationStatus!: ReservationStatusTypes;

  @Column({ nullable: true })
  returnDate?: Date;

  @Column({ nullable: true })
  acceptedAt?: Date;

  @Column({ nullable: true })
  cancelledAt?: Date;

  @Column({ nullable: true })
  returnedAt?: Date;

  @Column({ nullable: true })
  rejectedAt?: Date;
}
