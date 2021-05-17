import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('author')
export class AuthorOrmEntity extends TypeormEntityBase {
  constructor(props?: AuthorOrmEntity) {
    super(props);
  }

  @Column()
  fullName!: string;
}
