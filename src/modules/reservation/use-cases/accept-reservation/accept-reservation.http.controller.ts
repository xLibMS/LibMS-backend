import { routes } from '@config/app.routes';
import { acceptReservationSymbol } from '@modules/reservation/reservation.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import {
  Controller,
  HttpStatus,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Id } from 'src/interface-adapters/interfaces/id.interface';
import { AcceptReservationResponseI } from 'src/interface-adapters/interfaces/reservation/reservation.response.interface';
import { AccceptReservationCommand } from './accept-reservation.command';
import { AcceptReservationService } from './accept-reservation.service';

@Controller()
export class AcceptReservationHttpController {
  constructor(
    @Inject(acceptReservationSymbol)
    readonly acceptReservationService: AcceptReservationService,
  ) {}

  @Patch(routes.reservation.acceptReservation)
  @ApiOperation({ summary: 'Accept Reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @UseGuards(JwtAuthGuard)
  @RolesDecorator('librarian')
  async create(
    @Param() param: Id,
  ): Promise<AcceptReservationResponseI | undefined> {
    const acceptReservationCommand = new AccceptReservationCommand({
      reservationId: param.id,
    });
    const response = await this.acceptReservationService.acceptReservation(
      acceptReservationCommand,
    );

    return response;
  }
}
