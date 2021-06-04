import { routes } from '@config/app.routes';
import { checkOutSymbol } from '@modules/reservation/reservation.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import { RolesGuard } from '@modules/user/guards/roles.guard';
import {
  Controller,
  HttpStatus,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { Id } from 'src/interface-adapters/interfaces/id.interface';
import { CheckOutCommand } from './check-out.command';
import { CheckOutService } from './check-out.service';

@Controller()
export class CheckOutHttpController {
  constructor(
    @Inject(checkOutSymbol)
    readonly checkOutService: CheckOutService,
  ) {}

  @Patch(routes.reservation.checkOut)
  @ApiOperation({ summary: 'Check out book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book checked out',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('librarian')
  async checkOut(@Param() param: Id): Promise<IdResponse> {
    const checkOutCommand = new CheckOutCommand({
      reservationId: param.id,
    });

    const response = await this.checkOutService.checkOut(checkOutCommand);
    return new IdResponse(response.value);
  }
}
