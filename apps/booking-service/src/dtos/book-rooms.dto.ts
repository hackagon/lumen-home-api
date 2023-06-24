import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BookingEntity } from '../database/entities';

export class BookRoomsDto {
  @ValidateNested({ each: true })
  @Type(() => BookingEntity)
  bookings: BookingEntity[];

  userId: string;
}
