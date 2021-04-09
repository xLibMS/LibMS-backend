import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { UserRO } from './user.interface';
import { LoginUserDto } from 'src/modules/user/dtos';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { UserService } from 'src/modules/user/use-cases/Check_login/login-user.service';
import {
  ApiBearerAuth, ApiTags
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);

    const token = await this.userService.generateJWT(_user);
    const {email} = _user;
    const user = {email, token};
    return {user}
  }
}