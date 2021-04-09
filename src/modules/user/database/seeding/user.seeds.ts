import { NonFunctionProperties } from 'src/core/types';
import { createdAtUpdatedAtMock } from 'src/infrastructure/mocks/generic-model-props.mock';
import { UserOrmEntity } from '../user.orm-entity';

export const userSeeds: NonFunctionProperties<UserOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
    email: 'john-doe@msb.tn',
    universityID: '2102875',
    firstName: 'John',
    lastName: 'Doe',
    password: 'MyPassword91',
  },
  {
    ...createdAtUpdatedAtMock,
    id: 'a877f456-3284-42d1-b426-4c5f44eca561',
    email: 'jane-doe@medtech.tn',
    universityID: '2002975',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'MyPassword91',
  },
];
