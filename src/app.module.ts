import { mailerConfig } from '@config/mailer.config';
import { BookModule } from '@modules/book/book.module';
import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { BookRepository } from '@modules/book/database/book.repository';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import * as typeormConfig from './infrastructure/configs/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UserOrmEntity, BookOrmEntity]),
    MailerModule.forRoot(mailerConfig),
    UserModule,
    BookModule,
  ],
  controllers: [],
  providers: [UserRepository, BookRepository],
})
export class AppModule {}
