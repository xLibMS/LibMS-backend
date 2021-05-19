import { ApiProperty } from '@nestjs/swagger';
import { DateI } from '../interfaces/date.interface';

export class DateResponse implements DateI {
  constructor(returnDate?: Date) {
    this.returnDate = returnDate || undefined;
  }

  @ApiProperty({ example: 'date' })
  returnDate?: Date;
}
