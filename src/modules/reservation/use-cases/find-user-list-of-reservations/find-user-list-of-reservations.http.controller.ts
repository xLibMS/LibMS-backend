import { routes } from '@config/app.routes';
import { ReservationRepository } from '@modules/reservation/database/reservation.repository';
import { ReservationsResponse } from '@modules/reservation/dtos/reservations.response';
import { UserReservationResponse } from '@modules/reservation/dtos/user-reservation.response';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';

@Controller()
export class FindUserReservationsHttpController {
  constructor(private readonly reservationRepo: ReservationRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.reservation.userReservations)
  async findUserReservations(
    @Request() req: AuthenticateUserRequest,
  ): Promise<ReservationsResponse> {
    const userReservation = await this.reservationRepo.findReservationsByUser(
      req.user.id.value,
    );
    const reservationsResponse = userReservation.map(
      (reservation) => new UserReservationResponse(reservation),
    );
    return new ReservationsResponse(reservationsResponse);
  }
}
