import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status-types.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('reservation')
export class ReservationOrmEntity extends TypeormEntityBase {
  constructor(props?: ReservationOrmEntity) {
    super(props);
  }

  @Column()
  reservationDate!: Date;

  @Column()
  reservationStatus!: ReservationStatusTypes;

  @ManyToOne(() => BookOrmEntity, (book) => book.reservations)
  book!: BookOrmEntity;

  @ManyToOne(() => UserOrmEntity, (user) => user.reservations)
  user!: UserOrmEntity;
}
