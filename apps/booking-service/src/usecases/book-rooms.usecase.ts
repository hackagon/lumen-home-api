import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import datasource from '../database/datasource';
import { BookingEntity } from '../database/entities';

import { BookRoomsDto } from '../dtos';
import { IBookRoomsUseCase } from './i-book-rooms.usecase';
import moment from 'moment';

@Injectable()
export class BookRoomsUseCase implements IBookRoomsUseCase {
  async execute(data: BookRoomsDto) {
    const { bookings, userId } = data;
    const bookingEntities = bookings.map((booking) => {
      const { roomId, startDate, endDate } = booking;
      const bookingEntity = new BookingEntity();

      bookingEntity.customerId = userId;
      bookingEntity.roomId = roomId;
      bookingEntity.startDate = moment(startDate, 'DD-MM-YYYY').toDate();
      bookingEntity.endDate = moment(endDate, 'DD-MM-YYYY').toDate();
      return bookingEntity;
    });

    await datasource.getRepository(BookingEntity).save(bookingEntities);
  }

  async checkRoomsAvailability(bookings: any[]): Promise<boolean> {
    for (const booking of bookings) {
      const { roomId, startDate, endDate } = booking;

      const parsedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
      const parsedEndDate = moment(endDate, 'DD-MM-YYYY').toDate();

      if (moment(parsedEndDate).isBefore(parsedStartDate)) {
        return false;
      }

      const existingBookings = await datasource
        .getRepository(BookingEntity)
        .findBy({
          roomId,
          startDate: LessThanOrEqual(parsedEndDate),
          endDate: MoreThanOrEqual(parsedStartDate),
        });

      if (existingBookings.length > 0) {
        return false; // Room is already booked for the given dates
      }
    }

    return true; // All rooms are available
  }
}
