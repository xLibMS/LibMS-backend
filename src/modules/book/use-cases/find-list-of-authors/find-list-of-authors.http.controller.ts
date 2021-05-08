import { Controller, Get, UseGuards } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { AuthorRepository } from '@modules/book/database/Author/author.repository';
import { AuthorsResponse } from '@modules/book/dtos/authors.response.dts';
import { AuthorResponse } from '@modules/book/dtos/author.response.dts';

@Controller()
export class FindAuthorsHttpController {
  constructor(private readonly authorRepo: AuthorRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.book.authors)
  async findBooks(): Promise<AuthorsResponse> {
    const authors = await this.authorRepo.findMany();
    const authorsResponse = authors.map((author) => new AuthorResponse(author));
    return new AuthorsResponse(authorsResponse);
  }
}
