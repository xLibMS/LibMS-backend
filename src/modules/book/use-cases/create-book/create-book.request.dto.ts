import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsISBN,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Author } from 'src/interface-adapters/interfaces/book/author.interface';
import { CreateBook } from 'src/interface-adapters/interfaces/book/create-book.interface';

export class CreateBookRequest implements CreateBook {
  @ApiProperty({
    example: '0521880688',
    description: 'The ISBN of the book (10 or 13 digits)',
  })
  @IsISBN()
  isbn!: string;

  @ApiProperty({
    example: 'Numerical Recipes',
    description: 'The title of the book',
  })
  @Length(2, 250)
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'The Art of Scientific Computing',
    description: 'The subtitle of the book',
  })
  @Length(2, 250)
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    example: '',
    description: 'The title of the book in its original language',
  })
  @Length(2, 250)
  @IsString()
  @IsOptional()
  originalTitle?: string;

  @IsArray()
  authors!: Author[];

  @IsDateString()
  publishedDate!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageCount!: number;

  @IsString()
  @IsOptional()
  overview?: string;

  @IsString()
  publisher!: string;
}
