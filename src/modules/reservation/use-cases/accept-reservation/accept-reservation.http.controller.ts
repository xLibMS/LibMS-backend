import { routes } from '@config/app.routes';
import { acceptReservationSymbol } from '@modules/reservation/reservation.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Id } from 'src/interface-adapters/interfaces/id.interface';
import { AcceptReservationService } from './accept-reservation.service';

@Controller()
export class AcceptReservationHttpController {
  constructor(
    @Inject(acceptReservationSymbol)
    readonly acceptReservationService: AcceptReservationService,
  ) {}

  @Patch(routes.reservation.acceptReservation)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Accept Reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @UseGuards(JwtAuthGuard)
  @RolesDecorator('librarian')
  async create(@Param() param: Id): Promise<void> {
    await this.acceptReservationService.acceptReservation(param.id);
  }
}
