import { routes } from '@config/app.routes';
import { TokenResponse } from '@modules/user/dtos/token.response.dto';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@modules/user/guards/local-auth.guard';
import { authUserSymbol } from '@modules/user/user.providers';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';
import { AuthService } from './authenticate-user.service';

@Controller()
export class AuthenticateUserHttpController {
  constructor(
    @Inject(authUserSymbol) private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post(routes.user.auth)
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
  async login(@Request() req: AuthenticateUserRequest): Promise<TokenResponse> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    return new TokenResponse(accessToken, refreshToken);
  }

  // Should be moved to approriate use-case, this is left here for testing purposes
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthenticateUserRequest): UserResponse {
    return new UserResponse(req.user);
  }
}
