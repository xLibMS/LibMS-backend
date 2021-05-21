import { routes } from "@config/app.routes";
import { rejectReservationSymbol } from "@modules/reservation/reservation.provider";
import { JwtAuthGuard } from "@modules/user/guards/jwt-auth.guard";
import { RolesDecorator } from "@modules/user/guards/roles.decorator";
import { RolesGuard } from "@modules/user/guards/roles.guard";
import { Controller, HttpStatus, Inject, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IdResponse } from "src/interface-adapters/dtos/id.response.dto";
import { Id } from "src/interface-adapters/interfaces/id.interface";
import { RejectReservationCommand } from "./reject-reservation.command";
import { RejectReservationService } from "./reject-reservation.service";

@Controller()
export class RejectReservationHttpController {
    constructor(
        @Inject(rejectReservationSymbol)
        readonly rejectReservationService: RejectReservationService,
    ) {}

    @Patch(routes.reservation.rejectReservation)
    @ApiOperation({ summary: 'Reject a reservation' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Reservation rejected',
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RolesDecorator('librarian')
    async reject(
      @Param() param: Id,
    ): Promise<IdResponse> {
			const rejectReservationCommand = new RejectReservationCommand({
				reservationId: param.id,
			});

			const response = await this.rejectReservationService.rejectReservation(rejectReservationCommand);

			return new IdResponse(response.value);
		}
}