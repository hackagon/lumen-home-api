import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IsDateFormat } from './is-date-format.decorator';

export class FindAvailableRoomsDto {
  @IsNotEmpty()
  @IsDateFormat()
  desiredDate: string;

  page: number;

  limit: number;
}
