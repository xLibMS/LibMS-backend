import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserOrmEntity } from '../user.orm-entity';

@Entity('confirmationToken')
export class ConfirmationTokenOrmEntity extends TypeormEntityBase {
  constructor(props?: ConfirmationTokenOrmEntity) {
    super(props);
  }

  @Column()
  value!: string;

  @Column()
  expiresAt!: Date;

  @OneToOne(() => UserOrmEntity, { cascade: true })
  @JoinColumn()
  user!: UserOrmEntity;
}
