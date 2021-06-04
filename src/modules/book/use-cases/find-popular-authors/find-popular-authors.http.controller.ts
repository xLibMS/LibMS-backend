import { routes } from '@config/app.routes';
import { AuthorRepository } from '@modules/book/database/author/author.repository';
import { AuthorResponse } from '@modules/book/dtos/author.response.dto';
import { AuthorsResponse } from '@modules/book/dtos/authors.response.dto';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class FindPopularAuthorsHttpController {
  constructor(private readonly authorRepo: AuthorRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get(routes.author.authors)
  async findBooks(): Promise<AuthorsResponse> {
    const authors = await this.authorRepo.findMany();
    const authorsResponse = authors.map((author) => new AuthorResponse(author));
    return new AuthorsResponse(authorsResponse);
  }
}
