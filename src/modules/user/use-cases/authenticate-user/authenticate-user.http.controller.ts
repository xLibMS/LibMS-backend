import { routes } from '@config/app.routes';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { TokenResponse } from '@modules/user/dtos/token.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@modules/user/guards/local-auth.guard';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';
import { authUserSymbol } from '@modules/user/user.providers';
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
  getProfile(@Request() req: AuthenticateUserRequest): UserEntity {
    return req.user;
  }
}
