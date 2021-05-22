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
import { CreateReservationCommand } from './create-reservation.command';
import { CreateReservationCreation } from './create-reservation.request.dto';
import { CreateReservationService } from './create-reservation.service';

@Controller()
export class CreateReservationHttpController {
  constructor(
    @Inject(reserveBookSymbol)
    readonly createReservationService: CreateReservationService,
  ) {}

  @Post(routes.reservation.createReservation)
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
    @Body() body: CreateReservationCreation,
    @Request() req: AuthenticateUserRequest,
  ): Promise<IdResponse> {
    const createReservationCommand = new CreateReservationCommand({
      isbn: body.isbn,
      reservedAt: body.reservedAt,
      user: req.user,
    });

    const response = await this.createReservationService.CreateReservation(
      createReservationCommand,
    );
    return new IdResponse(response.value);
  }
}
