/* eslint-disable @typescript-eslint/no-empty-interface */
import { RepositoryPort } from 'src/core/ports/repository.ports';
import {
  ReservationRequestEntity,
  ReservationRequestProps,
} from '../domain/entities/reservation-request.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface ReservationRepositoryPort
  extends RepositoryPort<ReservationRequestEntity, ReservationRequestProps> {
  findOneByStatusOrThrow(isbn: string): Promise<ReservationRequestEntity>;
  findByDate(reservationDate: Date): Promise<ReservationRequestEntity>;
}
