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
import { routes } from '@config/app.routes';
import { createBookSymbol } from '@modules/book/book.provider';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBookService } from './create-book.service';
import { CreateBookRequest } from './create-book.request.dto';
import { CreateBookCommand } from './create-book.command';
import { CreateAuthorsCommand } from './create-author.command';
import { CreateImageCommand } from './create-image.command';

@Controller()
export class CreateBookHttpController {
  constructor(
    @Inject(createBookSymbol)
    private readonly createBookService: CreateBookService,
  ) {}

  @Post(routes.book.root)
  @UseInterceptors(FileInterceptor('image'))
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
  async create(
    @Body() body: CreateBookRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IdResponse> {
    const authorsCommand = new CreateAuthorsCommand(body.authors);

    const imageCommand = new CreateImageCommand({
      imageName: file.originalname,
      imageSize: file.size,
      imageType: file.mimetype,
      storedImage: file.buffer,
    });

    const bookCommand = new CreateBookCommand({
      isbn: body.isbn,
      title: body.title,
      subtitle: body.subtitle,
      originalTitle: body.originalTitle,
      authors: [],
      publisher: body.publisher,
      publishedDate: new Date(body.publishedDate),
      pageCount: body.pageCount,
      overview: body.overview,
    });

    const id = await this.createBookService.createBook(
      bookCommand,
      authorsCommand,
      imageCommand,
    );
    return new IdResponse(id.value);
  }
}
