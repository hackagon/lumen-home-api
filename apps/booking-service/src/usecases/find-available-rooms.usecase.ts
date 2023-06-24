import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import datasource from '../database/datasource';
import { BookingEntity, RoomEntity } from '../database/entities';
import { FindAvailableRoomsDto } from '../dtos';
import { IFindAvailableRoomsUseCase } from './i-find-available-rooms.usecase';

@Injectable()
export class FindAvailableRoomsUseCase implements IFindAvailableRoomsUseCase {
  async execute(data: FindAvailableRoomsDto) {
    const { desiredDate } = data;
    const page = _.get(data, 'page', 1);
    const limit = _.get(data, 'limit', 20);

    const query = datasource
      .getRepository(RoomEntity)
      .createQueryBuilder('room')
      .leftJoin(BookingEntity, 'booking', 'room.id = booking.room_id')
      .where('booking.room_id IS NULL')
      .orWhere(
        ":desiredDate < TO_CHAR(booking.start_date, 'DD-MM-YYYY') OR :desiredDate > TO_CHAR(booking.end_date, 'DD-MM-YYYY')",
        { desiredDate },
      )
      .skip((page - 1) * limit)
      .take(limit);

    const availableRooms = await query.getMany();

    const totalCount = await query.getCount();
    const totalPages = Math.ceil(totalCount / limit);

    // Prepare the response format
    const meta = {
      totalItems: totalCount,
      itemCount: availableRooms.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    };

    return {
      meta,
      data: availableRooms,
    };
  }
}
