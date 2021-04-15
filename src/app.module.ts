import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '@config/mailer.config';
import { BookModule } from '@modules/book/book.module';
import { BookRepository } from '@modules/book/database/book.repository';
import { BookOrmEntity } from '@modules/book/database/book.orm-entity';
import { typeormConfig } from './infrastructure/configs/ormconfig';

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
