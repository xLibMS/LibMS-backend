import { CreateUser } from 'src/interface-adapters/interfaces/user/create-user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserRequest implements CreateUser {
  @ApiProperty({
    example: 'john@medtech.tn',
    description: 'User email address',
  })
  @MaxLength(320)
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '2012481', description: 'University ID' })
  @Length(7, 7)
  @IsString()
  universityID!: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @MaxLength(32)
  @IsString()
  @IsAlpha()
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @MaxLength(32)
  @IsAlpha()
  lastName!: string;

  @ApiProperty({ example: 'MyPassword!1', description: 'Password' })
  @Length(5, 64)
  @IsString()
  password!: string;
}
