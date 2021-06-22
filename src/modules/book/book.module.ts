import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from 'src/infrastructure/services/image-upload.service';
import { createBookProvider, findRecentBooksProvider } from './book.provider';
import { AuthorOrmEntity } from './database/author/author.orm-entity';
import { AuthorRepository } from './database/author/author.repository';
import { BookOrmEntity } from './database/book.orm-entity';
import { BookRepository } from './database/book.repository';
import { ImageOrmEntity } from './database/image/image.orm-entity';
import { ImageRepository } from './database/image/image.repository';
import { CreateBookHttpController } from './use-cases/create-book/create-book.http.controller';
import { FindBookByIdHttpcontroller } from './use-cases/find-book-by-id/find-book-by-id.controller';
import { FindAuthorsHttpController } from './use-cases/find-list-of-authors/find-list-of-authors.http.controller';
import { FindBooksHttpController } from './use-cases/find-list-of-books/find-books.controller';
import { FindRecentBooksHttpController } from './use-cases/find-recent-books/find-recent-books.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookOrmEntity, AuthorOrmEntity, ImageOrmEntity]),
    JwtModule.register({}),
    MulterModule.register({}),
    PassportModule,
    AuthService,
  ],
  controllers: [
    FindBooksHttpController,
    CreateBookHttpController,
    FindAuthorsHttpController,
    FindBookByIdHttpcontroller,
    FindRecentBooksHttpController,
  ],
  providers: [
    BookRepository,
    createBookProvider,
    findRecentBooksProvider,
    ImageUploadService,
    AuthorRepository,
    ImageRepository,
  ],
  exports: [],
})
export class BookModule {}
