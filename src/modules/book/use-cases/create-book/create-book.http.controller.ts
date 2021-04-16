import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { routes } from '@config/app.routes';
import { createBookSymbol } from '@modules/book/book.provider';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { CreateBookService } from './create-book.service';
import { CreateBookRequest } from './create-book.request.dto';
import { CreateBookCommand } from './create-book.command';

@Controller()
export class CreateBookHttpController {
  constructor(
    @Inject(createBookSymbol)
    private readonly createBookService: CreateBookService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(routes.book.root)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Book already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateBookRequest): Promise<IdResponse> {
    const command = new CreateBookCommand({
      isbn: {
        isbn13: body.isbn13,
        isbn10: body.isbn10,
      },
      title: body.title,
      subtitle: body.subtitle,
      originalTitle: body.originalTitle,
      authors: body.authors,
      publisher: body.publisher,
      publishedDate: new Date(body.publishedDate),
      image: body.image,
      pageCount: body.pageCount,
      overview: body.overview,
    });

    const id = await this.createBookService.createBook(command);
    return new IdResponse(id.value);
  }
}
