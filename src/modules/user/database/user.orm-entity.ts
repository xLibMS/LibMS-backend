import { ReservationOrmEntity } from '@modules/reservation/database/reservation.orm-entity';
import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Roles } from 'src/interface-adapters/enum/roles.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserOrmEntity extends TypeormEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  universityID!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column()
  role!: Roles;

  @Column()
  isEmailVerified!: boolean;

  @OneToMany(() => ReservationOrmEntity, (reservations) => reservations.user)
  reservations!: ReservationOrmEntity[];
}
