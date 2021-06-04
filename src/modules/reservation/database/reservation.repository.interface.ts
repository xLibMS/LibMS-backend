/* eslint-disable @typescript-eslint/no-empty-interface */
import { RepositoryPort } from 'src/core/ports/repository.ports';
import {
  ReservationEntity,
  ReservationProps,
} from '../domain/entities/reservation.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface ReservationRepositoryPort
  extends RepositoryPort<ReservationEntity, ReservationProps> {
  findReservationById(id: string): Promise<ReservationEntity>;
}
