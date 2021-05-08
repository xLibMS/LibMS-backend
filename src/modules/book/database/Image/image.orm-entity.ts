import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('image')
export class ImageOrmEntity extends TypeormEntityBase {
  constructor(props?: ImageOrmEntity) {
    super(props);
  }

  @Column()
  imageName!: string;

  @Column()
  imageType!: string;

  @Column()
  imageSize!: number;
}
