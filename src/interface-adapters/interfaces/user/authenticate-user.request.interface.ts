import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface AuthenticateUserRequest extends Request {
  user: UserEntity;
}
