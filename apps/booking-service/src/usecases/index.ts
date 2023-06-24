import { Module } from '@nestjs/common';
import { RepositoryModule } from '../database/repositories';
import { BookRoomsUseCase } from './book-rooms.usecase';
import { FindAvailableRoomsUseCase } from './find-available-rooms.usecase';
import { IBookRoomsUseCase } from './i-book-rooms.usecase';
import { IFindAvailableRoomsUseCase } from './i-find-available-rooms.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: IFindAvailableRoomsUseCase,
      useClass: FindAvailableRoomsUseCase,
    },
    {
      provide: IBookRoomsUseCase,
      useClass: BookRoomsUseCase,
    },
  ],
  exports: [IFindAvailableRoomsUseCase, IBookRoomsUseCase],
})
export class BookingUseCaseModule {}
