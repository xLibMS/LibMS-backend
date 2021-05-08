import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from 'src/infrastructure/services/image-upload.service';
import { createBookProvider } from './book.provider';
import { AuthorOrmEntity } from './database/Author/author.orm-entity';
import { AuthorRepository } from './database/author/author.repository';
import { BookOrmEntity } from './database/book.orm-entity';
import { BookRepository } from './database/book.repository';
import { ImageOrmEntity } from './database/Image/image.orm-entity';
import { ImageRepository } from './database/Image/image.repository';
import { CreateBookHttpController } from './use-cases/create-book/create-book.http.controller';
import { FindAuthorsHttpController } from './use-cases/find-list-of-authors/find-list-of-authors.http.controller';
import { FindBooksHttpController } from './use-cases/find-list-of-books/find-books.controller';

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
  ],
  providers: [
    BookRepository,
    createBookProvider,
    ImageUploadService,
    AuthorRepository,
    ImageRepository,
  ],
  exports: [],
})
export class BookModule {}
