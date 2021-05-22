import { routes } from '@config/app.routes';
import { TokenResponse } from '@modules/user/dtos/token.response.dto';
import { LocalAuthGuard } from '@modules/user/guards/local-auth.guard';
import { authUserSymbol } from '@modules/user/user.providers';
import {
  Controller,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CookieOptions, Response } from 'express-serve-static-core';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';
import { AuthService } from './authenticate-user.service';

@Controller()
export class AuthenticateUserHttpController {
  constructor(
    @Inject(authUserSymbol) private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post(routes.auth.login)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async login(
    @Req() req: AuthenticateUserRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenResponse> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    const cookieOptions: CookieOptions = {
      secure: false,
      httpOnly: false,
      sameSite: 'none',
    };
    if (refreshToken.expiresIn) {
      cookieOptions.expires = new Date(Date.now() + refreshToken.expiresIn);
    }
    res.cookie('REFRESH_TOKEN', refreshToken.token, cookieOptions);
    return new TokenResponse(accessToken);
  }
}
