import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Request } from 'express-serve-static-core';

export interface AuthenticateUserRequest extends Request {
  user: UserEntity;
}
