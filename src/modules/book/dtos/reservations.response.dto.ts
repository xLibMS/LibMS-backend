import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ReservationEntity } from '../domain/entities/reservation.entity';

export class CreateReservationDto {
  constructor(reservations: ReservationEntity[]) {
    this.reservations = reservations;
  }

  @ApiProperty({
    example: [],
  })
  @IsArray()
  reservations: ReservationEntity[] = [];
}
