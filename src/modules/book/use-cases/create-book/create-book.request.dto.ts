import {
  Author,
  CreateBook,
} from 'src/interface-adapters/interfaces/book/create-book.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateBookRequest implements CreateBook {
  @ApiProperty({
    example: '0521880688',
    description: 'The 10-digit ISBN of the book',
  })
  @Length(10, 10)
  @IsString()
  isbn10!: string;

  @ApiProperty({
    example: '9780521880688',
    description: 'The 13-digit ISBN of the book',
  })
  @Length(13, 13)
  @IsString()
  isbn13!: string;

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
  subtitle!: string;

  @ApiProperty({
    example: '',
    description: 'The title of the book in its original language',
  })
  @Length(2, 250)
  @IsString()
  @IsOptional()
  originalTitle?: string | undefined;

  @IsArray()
  authors!: Author[];

  @IsDateString()
  publishedDate!: string;

  @IsString()
  image!: string;

  @IsNumber()
  @Min(2)
  @Max(7300)
  pageCount!: number;

  @IsString()
  overview?: string | undefined;

  @IsString()
  publisher!: string;
}
