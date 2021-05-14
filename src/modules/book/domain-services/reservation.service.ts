import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from '../database/reservation.repository';
import { BookEntity } from '../domain/entities/book.entity';
import { ReservationEntity } from '../domain/entities/reservation.entity';

/* @Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository) private reservationRepository: ReservationRepository,
  ) {} */

/* async getAllBookReservation(): Promise<ReservationEntity> {
    
  } */
