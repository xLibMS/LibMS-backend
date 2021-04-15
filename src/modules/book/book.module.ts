import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createBookProvider } from './book.provider';
import { BookOrmEntity } from './database/book.orm-entity';
import { BookRepository } from './database/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookOrmEntity])],
  controllers: [],
  providers: [BookRepository, createBookProvider],
  exports: [],
})
export class BookModule {}
