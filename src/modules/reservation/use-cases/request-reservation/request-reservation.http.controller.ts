import { routes } from '@config/app.routes';
import { reserveBookSymbol } from '@modules/reservation/reservation.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import { RolesGuard } from '@modules/user/guards/roles.guard';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';
import { RequestReservationCommand } from './request-reservation.command';
import { RequestReservationRequest } from './request-reservation.request.dto';
import { RequestReservationService } from './request-reservation.service';

@Controller()
export class RequestReservationHttpController {
  constructor(
    @Inject(reserveBookSymbol)
    readonly requestReservationService: RequestReservationService,
  ) {}

  @Post(routes.reservation.root)
  @ApiOperation({ summary: 'Demand reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('member', 'librarian')
  async create(
    @Body() body: RequestReservationRequest,
    @Request() req: AuthenticateUserRequest,
  ): Promise<IdResponse> {
    const requestReservationCommand = new RequestReservationCommand({
      isbn: body.isbn,
      reservationDate: body.reservationDate,
      email: req.user.email,
    });

    const response = await this.requestReservationService.requestReservation(
      requestReservationCommand,
    );
    return new IdResponse(response.value);
  }
}
