import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { Repository } from 'typeorm';
import {
  ReservationEntity,
  ReservationCreationProps,
} from '../domain/entities/reservation.entity';
import { ReservationOrmEntity } from './reservation.orm-entity';
import { ReservationOrmMapper } from './reservation.orm-mapper';
import { ReservationRepositoryPort } from './reservation.repository.interface';

@Injectable()
export class ReservationRepository
  extends TypeormRepositoryBase<
    ReservationEntity,
    ReservationCreationProps,
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
      new ReservationOrmMapper(ReservationEntity, ReservationOrmEntity),
      new Logger('reservation-entity'),
    );
  }

  async findReservationById(id: string): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!reservation) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(reservation);
  }

  protected prepareQuery(
    params: QueryParams<ReservationCreationProps>,
  ): WhereCondition<ReservationOrmEntity> {
    const where: QueryParams<ReservationOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}
