import { Controller, Get } from '@nestjs/common';
import { ReservationRepository } from '../../database/reservation.repository';
import { CreateReservationDto } from '../../dtos/reservations.response.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private ReservationRepo: ReservationRepository) {}

  @Get('/')
  async getAllReservation(): Promise<CreateReservationDto> {
    const reservations = await this.ReservationRepo.find();
    return new CreateReservationDto(reservations);
  }
}
