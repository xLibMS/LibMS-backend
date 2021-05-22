import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/interface-adapters/base-classes/response.base';
import { User } from 'src/interface-adapters/interfaces/user/user.interface';

export class UserResponse extends ResponseBase implements User {
  constructor(user: UserEntity) {
    super(user);
    this.email = user.email.value;
    this.universityID = user.universityID.value;
    this.firstName = user.fullName.firstName;
    this.lastName = user.fullName.lastName;
    this.role = user.role;
  }

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: '2012481',
    description: "User's university ID",
  })
  universityID: string;

  @ApiProperty({
    example: 'John',
    description: "User's first name",
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: "User's last name",
  })
  lastName: string;

  @ApiProperty({
    example: 'librarian',
    description: "User's role",
  })
  role: string;
}
