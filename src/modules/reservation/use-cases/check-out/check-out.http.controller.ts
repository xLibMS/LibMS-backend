import { routes } from '@config/app.routes';
import { checkOutSymbol } from '@modules/reservation/reservation.provider';
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
import { CheckOutService } from './check-out.service';

@Controller()
export class CheckOutHttpController {
  constructor(
    @Inject(checkOutSymbol)
    readonly checkOutService: CheckOutService,
  ) {}

  @Patch(routes.reservation.checkOut)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Check out book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book checked out',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('librarian')
  async checkOut(@Param() param: Id): Promise<void> {
    await this.checkOutService.checkOut(param.id);
  }
}
