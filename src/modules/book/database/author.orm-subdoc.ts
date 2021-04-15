import { Column } from 'typeorm';

export class Author {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
