import { routes } from '@config/app.routes';
import { AcceptReservationResponse } from '@modules/reservation/dtos/accept-reservation.response.dto';
import { acceptReservationSymbol } from '@modules/reservation/reservation.provider';
import { Controller, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Id } from 'src/interface-adapters/interfaces/id.interface';
import { AccceptReservationCommand } from './accept-reservation.command';
import { AcceptReservationService } from './accept-reservation.service';

@Controller()
export class AcceptReservationHttpController {
  constructor(
    @Inject(acceptReservationSymbol)
    readonly acceptReservationService: AcceptReservationService,
  ) {}

  @Post(routes.reservation.acceptReservation)
  @ApiOperation({ summary: 'Accept Reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(
    @Param() param: Id,
  ): Promise<AcceptReservationResponse | undefined> {
    const acceptReservationCommand = new AccceptReservationCommand({
      reservationId: param.id,
    });
    const response = await this.acceptReservationService.acceptReservation(
      acceptReservationCommand,
    );

    return new AcceptReservationResponse(response);
  }
}
