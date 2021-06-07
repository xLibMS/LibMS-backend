import { routes } from '@config/app.routes';
import { confirmUserEmailSymbol } from '@modules/user/user.providers';
import { Controller, Get, HttpStatus, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfirmUserEmailCommand } from './confirm-user-email.command';
import { ConfirmUserRequest } from './confirm-user-email.request.dto';
import { ConfirmUserEmailService } from './confirm-user-email.service';

@Controller()
export class ConfirmUserEmailController {
  constructor(
    @Inject(confirmUserEmailSymbol)
    private readonly confirmEmailService: ConfirmUserEmailService,
  ) {}

  @Get(routes.confirmationToken.confirm)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already verified',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token has expired',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async confirm(@Param() param: ConfirmUserRequest): Promise<void> {
    const confirmEmailCommand = new ConfirmUserEmailCommand({
      confirmationToken: param.token,
    });
    await this.confirmEmailService.confirmUser(confirmEmailCommand);
  }
}
