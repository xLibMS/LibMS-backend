import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('image')
export class ImageOrmEntity extends TypeormEntityBase {
  constructor(props?: ImageOrmEntity) {
    super(props);
  }

  @Column()
  name!: string;

  @Column()
  mimeType!: string;

  @Column()
  size!: number;
}
