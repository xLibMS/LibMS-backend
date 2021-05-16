import { Controller, Get, UseGuards } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { ReservationRepository } from '@modules/reservation/database/reservation.repository';
import { ReservationResponse } from '@modules/reservation/dtos/reservation.response';
import { ReservationsResponse } from '@modules/reservation/dtos/reservations.response';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import { RolesGuard } from '@modules/user/guards/roles.guard';

@Controller()
export class FindReservationsHttpController {
  constructor(private readonly reservationRepo: ReservationRepository) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('member', 'librarian')
  @Get(routes.reservation.reservations)
  async findReservations(): Promise<ReservationsResponse> {
    const reservations = await this.reservationRepo.findMany();
    const reservationsResponse = reservations.map(
      (reservation) => new ReservationResponse(reservation),
    );
    return new ReservationsResponse(reservationsResponse);
  }
}
