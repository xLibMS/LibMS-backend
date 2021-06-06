import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsISBN } from 'class-validator';
import { CreateReservation } from 'src/interface-adapters/interfaces/reservation/create-reservation.interface';

export class CreateReservationCreation implements CreateReservation {
  @ApiProperty({
    example: '0521880688',
    description: 'The ISBN of the book (10 or 13 digits)',
  })
  @IsISBN()
  isbn!: string;

  @ApiProperty({
    example: '2021-05-10 20:36:02.67234',
    description: 'The Date format is invalid',
  })
  @IsDateString()
  reservedAt!: string;
}
