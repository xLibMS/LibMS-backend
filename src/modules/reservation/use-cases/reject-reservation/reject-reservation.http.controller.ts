import { routes } from '@config/app.routes';
import { rejectReservationSymbol } from '@modules/reservation/reservation.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import { RolesGuard } from '@modules/user/guards/roles.guard';
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
import { RejectReservationService } from './reject-reservation.service';

@Controller()
export class RejectReservationHttpController {
  constructor(
    @Inject(rejectReservationSymbol)
    readonly rejectReservationService: RejectReservationService,
  ) {}

  @Patch(routes.reservation.rejectReservation)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Reject a reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reservation rejected',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('librarian')
  async reject(@Param() param: Id): Promise<void> {
    await this.rejectReservationService.rejectReservation(param.id);
  }
}
