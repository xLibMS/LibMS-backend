import { routes } from '@config/app.routes';
import { createBookSymbol } from '@modules/book/book.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import { RolesGuard } from '@modules/user/guards/roles.guard';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { CreateBookCommand } from './create-book.command';
import { CreateBookRequest } from './create-book.request.dto';
import { CreateBookService } from './create-book.service';
@Controller()
export class CreateBookHttpController {
  constructor(
    @Inject(createBookSymbol)
    private readonly createBookService: CreateBookService,
  ) {}

  @Post(routes.book.root)
  @ApiOperation({ summary: 'Create a book' })
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('librarian')
  async create(
    @Body() body: CreateBookRequest,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IdResponse> {
    const bookCommand = new CreateBookCommand({
      isbn: body.isbn,
      title: body.title,
      subtitle: body.subtitle,
      originalTitle: body.originalTitle,
      authors: body.authors,
      publisher: body.publisher,
      image,
      publishedDate: body.publishedDate,
      pageCount: body.pageCount,
      overview: body.overview,
      copiesNbr: body.copiesNbr,
    });

    const id = await this.createBookService.createBook(bookCommand);
    return new IdResponse(id.value);
  }
}
