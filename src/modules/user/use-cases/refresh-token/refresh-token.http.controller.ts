/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Request,
  UseGuards,
} from '@nestjs/common';
import { routes } from '@config/app.routes';
import { refreshTokenSymbol } from '@modules/user/user.providers';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';
import { TokenResponse } from '@modules/user/dtos/token.response.dto';
import { JwtRefreshGuard } from '@modules/user/guards/jwt-refresh.guard';
import { RefreshTokenService } from './refresh-token.service';

@Controller()
export class RefreshTokenHttpController {
  constructor(
    @Inject(refreshTokenSymbol)
    private readonly refreshToken: RefreshTokenService,
  ) {}

  @Get(routes.user.refresh)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @UseGuards(JwtRefreshGuard)
  async create(
    @Request() req: AuthenticateUserRequest,
  ): Promise<TokenResponse> {
    const { accessToken } = await this.refreshToken.refresh(req.user);
    return new TokenResponse(accessToken);
  }
}
