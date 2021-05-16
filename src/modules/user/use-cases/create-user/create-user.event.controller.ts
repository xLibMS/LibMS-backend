import { createUserSymbol } from '@modules/user/user.providers';
import { Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { Roles } from 'src/interface-adapters/enum/roles.enum';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequest } from './create-user.request.dto';
import { CreateUserService } from './create-user.service';

export class CreateUserEventController {
  constructor(
    @Inject(createUserSymbol)
    private readonly createUser: CreateUserService,
  ) {}

  @MessagePattern('user.create') // <- Subscribe to microservice event
  async create(payload: CreateUserRequest): Promise<IdResponse> {
    const command = new CreateUserCommand({
      email: payload.email,
      universityID: payload.universityID,
      fullName: {
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
      password: payload.password,
      role: Roles.librarian,
    });

    const id = await this.createUser.createUser(command);

    return new IdResponse(id.value);
  }
}
