import { EntityRepository, Repository } from 'typeorm';
import { ReservationEntity } from '../domain/entities/reservation.entity';

@EntityRepository(ReservationEntity)
export class ReservationRepository extends Repository<ReservationEntity> {}
