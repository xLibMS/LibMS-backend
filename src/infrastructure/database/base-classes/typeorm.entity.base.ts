import { ObjectIdColumn, CreateDateColumn, Column, UpdateDateColumn, ObjectID, PrimaryColumn } from 'typeorm';

export abstract class TypeormEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @ObjectIdColumn()
  private _id!: ObjectID;

  @PrimaryColumn({ update: false })
  id!: string;

  @CreateDateColumn({
    type: 'timestamp',
    update: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}
