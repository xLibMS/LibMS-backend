import { NonFunctionProperties } from 'src/core/types';
import { createdAtUpdatedAtMock } from 'src/infrastructure/mocks/generic-model-props.mock';
import { BookOrmEntity } from '../book.orm-entity';

export const bookSeeds: NonFunctionProperties<BookOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: 'a877f456-3284-42d1-b426-4c5f44eca561',
    isbn10: '9780321815736',
    isbn13: '9780321815736',
    title: 'Software Architecture in Practice',
    subtitle: '(SEI Series in Software Engineering), 3rd Edition',
    authors: [
      {
        firstName: 'Len',
        lastName: 'Baas',
      },
      {
        firstName: 'Rick',
        lastName: 'Kazman',
      },
      {
        firstName: 'Paul',
        lastName: 'Clements',
      },
    ],
    image: { imageName: 'cover.jpg', imageSize: 400, imageType: 'image/jpeg' },
    publisher: 'Addison-Wesley Professional',
    publishedDate: new Date(2012, 9, 25),
    pageCount: 624,
    overview:
      'The award-winning and highly influential Software Architecture in Practice, Third Edition, has been substantially revised to reflect the latest developments in the field. In a real-world setting, the book once again introduces the concepts and best practices of software architecture―how a software system is structured and how that system’s elements are meant to interact. Distinct from the details of implementation, algorithm, and data representation, an architecture holds the key to achieving system quality, is a reusable asset that can be applied to subsequent systems, and is crucial to a software organization’s business strategy.',
  },
  {
    ...createdAtUpdatedAtMock,
    id: '675b5c6f-52de-474f-aba6-f7717844a5e8',
    isbn13: '9780132145213',
    title: 'Engineering Ethics',
    subtitle: '4th Edition',
    originalTitle: 'string',
    authors: [
      {
        firstName: 'Charles',
        lastName: 'Fleddermann',
      },
    ],
    image: { imageName: 'cover.png', imageSize: 450, imageType: 'image/png' },
    publisher: 'Pearson',
    publishedDate: new Date(2012),
    pageCount: 192,
  },
];
