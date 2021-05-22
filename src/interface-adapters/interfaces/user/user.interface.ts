import { ModelBase } from '../model.base.interface';

export interface User extends ModelBase {
  email: string;
  universityID: string;
  firstName: string;
  lastName: string;
  role: string;
}
