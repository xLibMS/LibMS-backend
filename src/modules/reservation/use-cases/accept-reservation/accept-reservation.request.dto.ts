import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { AcceptReservation } from 'src/interface-adapters/interfaces/reservation/accept-reservation.interface';

export class AcceptReservationRequest implements AcceptReservation {
  @ApiProperty({
    example: '2021-05-10 20:36:02.67234',
    description: 'The Date format is invalid',
  })
  @IsDateString()
  acceptedAt!: string;
}
