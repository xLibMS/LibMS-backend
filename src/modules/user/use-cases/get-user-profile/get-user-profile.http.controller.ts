import { routes } from '@config/app.routes';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';

@Controller()
export class GetUserProfileHttpController {
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @UseGuards(JwtAuthGuard)
  @Get(routes.user.profile)
  getProfile(@Req() req: AuthenticateUserRequest): UserResponse {
    return new UserResponse(req.user);
  }
}
