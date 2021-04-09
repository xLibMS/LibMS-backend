import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
   /*  id!: string;  
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    }) */
    
    password!: string;  @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    
    email!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

}