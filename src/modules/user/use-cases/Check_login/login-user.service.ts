import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto} from 'src/modules/user/dtos';
const jwt = require('jsonwebtoken');
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/use-cases/Check_login/login-user.entity';
import * as argon2 from 'argon2';
import { User } from 'src/interface-adapters/interfaces/user/user.interface';
//import { SECRET } from '../config';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async findOne({email, password}: LoginUserDto): Promise<UserEntity> 
  {
    const user = await this.userRepository.findOne({email});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

  }
  public generateJWT(user: UserEntity) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      //id: user.id,
     // username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, //SECRET
    );
  };

    }