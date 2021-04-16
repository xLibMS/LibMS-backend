import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createBookProvider } from './book.provider';
import { BookOrmEntity } from './database/book.orm-entity';
import { BookRepository } from './database/book.repository';
import { CreateBookHttpController } from './use-cases/create-book/create-book.http.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookOrmEntity]),
    JwtModule.register({}),
    PassportModule,
    AuthService,
  ],
  controllers: [CreateBookHttpController],
  providers: [BookRepository, createBookProvider],
  exports: [],
})
export class BookModule {}
