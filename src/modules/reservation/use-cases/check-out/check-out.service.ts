import { ReservationRepositoryPort } from '@modules/reservation/database/reservation.repository.interface';
import { ReservationService } from '@modules/reservation/domain/services/reservation.service';
import { ID } from 'src/core/value-objects/id.value-object';
import { CheckOutCommand } from './check-out.command';

export class CheckOutService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
    private readonly reservationService: ReservationService,
  ) {}

  async checkOut(checkOutCommandCommand: CheckOutCommand): Promise<ID> {
    const { reservationId } = checkOutCommandCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    );

    const checkedOut = this.reservationService.checkOut(reservation);

    const savedReservation = await this.reservationRepo.save(checkedOut);

    return savedReservation.id;
  }
}
