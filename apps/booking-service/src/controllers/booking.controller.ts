import { EKafkaMessage } from '@libs/common';
import { ResourceSerialization } from '@libs/infra/serialization/resource.serialization';
import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookRoomsDto } from '../dtos';
import { FindAvailableRoomsDto } from '../dtos/find-available-rooms.dto';
import { IBookRoomsUseCase } from '../usecases/i-book-rooms.usecase';
import { IFindAvailableRoomsUseCase } from '../usecases/i-find-available-rooms.usecase';

@Controller()
export class BookingController {
  constructor(
    @Inject(IFindAvailableRoomsUseCase)
    private findAvailableRoomsUseCase: IFindAvailableRoomsUseCase,
    @Inject(IBookRoomsUseCase)
    private bookRoomsUseCase: IBookRoomsUseCase,
  ) {}

  @UseInterceptors(ResourceSerialization)
  @MessagePattern(EKafkaMessage.REQUEST_FIND_AVAILABLE_ROOMS)
  async findAvailableRooms(data: FindAvailableRoomsDto) {
    return this.findAvailableRoomsUseCase.execute(data);
  }

  @UseInterceptors(ResourceSerialization)
  @MessagePattern(EKafkaMessage.REQUEST_BOOK_ROOMS)
  async bookRooms(data: BookRoomsDto) {
    try {
      const { bookings } = data;
      console.log('nfnjndjnfjdnfjdnj');

      const isRoomsAvailable =
        await this.bookRoomsUseCase.checkRoomsAvailability(bookings);

      if (isRoomsAvailable) {
        await this.bookRoomsUseCase.execute(data);
        return { message: 'Rooms booked successfully.' };
      } else {
        return {
          message:
            'Some rooms are already booked for the given dates, endDate cannot be before startDate',
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(
        'An error occurred while booking the rooms. Please try again later.',
      );
    }
  }
}
