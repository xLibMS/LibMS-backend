import { routes } from '@config/app.routes';
import { acceptReservationSymbol } from '@modules/reservation/reservation.provider';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DateResponse } from 'src/interface-adapters/dtos/date.response.dto';
import { Id } from 'src/interface-adapters/interfaces/id.interface';
import { AccceptReservationCommand } from './accept-reservation.command';
import { AcceptReservationRequest } from './accept-reservation.request.dto';
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
    @Body() body: AcceptReservationRequest,
    @Param() param: Id,
  ): Promise<DateResponse | undefined> {
    const acceptReservationCommand = new AccceptReservationCommand({
      acceptedAt: body.acceptedAt,
      reservationId: param.id,
    });
    const response = await this.acceptReservationService.acceptReservation(
      acceptReservationCommand,
    );

    return new DateResponse(response?.value);
  }
}
