import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import {
  ReservationRequestEntity,
  ReservationRequestProps,
} from '../domain/entities/reservation-request.entity';
import { ReservationOrmEntity } from './reservation.orm-entity';
import { ReservationOrmMapper } from './reservation.orm-mapper';
import { ReservationRepositoryPort } from './reservation.repository.interface';

@Injectable()
export class ReservationRepository
  extends TypeormRepositoryBase<
    ReservationRequestEntity,
    ReservationRequestProps,
    ReservationOrmEntity
  >
  implements ReservationRepositoryPort
{
  protected relations: string[] = [
    'user',
    'book',
    'book.authors',
    'book.image',
  ];

  constructor(
    @InjectRepository(ReservationOrmEntity)
    private readonly reservationRepository: Repository<ReservationOrmEntity>,
  ) {
    super(
      reservationRepository,
      new ReservationOrmMapper(ReservationRequestEntity, ReservationOrmEntity),
      new Logger('reservation-entity'),
    );
  }

  findOneByStatusOrThrow(isbn: string): Promise<ReservationRequestEntity> {
    throw new Error('Method not implemented.');
  }

  findByDate(reservationDate: Date): Promise<ReservationRequestEntity> {
    throw new Error('Method not implemented.');
  }

  protected prepareQuery(
    params: QueryParams<ReservationRequestProps>,
  ): WhereCondition<ReservationOrmEntity> {
    const where: QueryParams<ReservationOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}
