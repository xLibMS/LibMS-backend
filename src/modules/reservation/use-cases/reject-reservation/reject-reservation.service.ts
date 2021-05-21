import { ReservationRepositoryPort } from "@modules/reservation/database/reservation.repository.interface";
import { ID } from "src/core/value-objects/id.value-object";
import { RejectReservationCommand } from "./reject-reservation.command";

export class RejectReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepositoryPort,
  ) {}

	async rejectReservation(
		rejectReservationCommand: RejectReservationCommand,
	): Promise<ID> {
    const { reservationId } = rejectReservationCommand;
    const reservation = await this.reservationRepo.findReservationById(
      reservationId,
    )

    reservation.rejectReservation();

    const reservationResponse = await this.reservationRepo.save(reservation);

    return reservationResponse.id;

  }
  
}