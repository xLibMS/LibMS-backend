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
  ReservationRequestProps,
} from '../domain/entities/reservation-request.entity';
import { ReservationOrmEntity } from './reservation.orm-entity';
import { ReservationOrmMapper } from './reservation.orm-mapper';
import { ReservationRepositoryPort } from './reservation.repository.interface';

@Injectable()
export class ReservationRepository
  extends TypeormRepositoryBase<
    ReservationEntity,
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

  findByDate(reservationDate: Date): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }

  findOneByStatusOrThrow(isbn: string): Promise<ReservationEntity> {
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
