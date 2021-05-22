import { ConflictException } from '@exceptions';
import { BookRepositoryPort } from '@modules/book/database/book.repository.interface';
import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationEntity } from '@modules/reservation/domain/entities/reservation.entity';
import { ID } from 'src/core/value-objects/id.value-object';
import { ReservationStatusTypes } from 'src/interface-adapters/enum/reservation-status.enum';
import { CreateReservationCommand } from './create-reservation.command';

export class CreateReservationService {
  constructor(
    private readonly bookRepo: BookRepositoryPort,
    private readonly reservationRepo: ReservationRepositoryPort,
  ) {}

  async CreateReservation(
    CreateReservationCommand: CreateReservationCommand,
  ): Promise<ID> {
    const { reservedAt, isbn, user, ...demand } = CreateReservationCommand;

    const book = await this.bookRepo.findOneByISBNOrThrow(isbn.value);

    const CreateReservation = new ReservationEntity({
      ...demand,
      book,
      user,
      reservedAt,
      reservationStatus: ReservationStatusTypes.pending,
    });
    let created;
    if (book.copiesNbr > 0) {
      created = await this.reservationRepo.save(CreateReservation);
    } else {
      throw new ConflictException('The book is out of stock');
    }
    return created.id;
  }
}
