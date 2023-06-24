import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApartmentEntity,
  BookingEntity,
  CustomerEntity,
  RoomEntity,
} from '../entities';
import { BookingRepository } from './booking.repository';
import { CustomerRepository } from './customer.repository';
import { RoomRepository } from './room.repository';

export * from './customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      ApartmentEntity,
      RoomEntity,
      BookingEntity,
    ]),
  ],
  providers: [CustomerRepository, RoomRepository, BookingRepository],
  exports: [CustomerRepository, RoomRepository, BookingRepository],
})
export class RepositoryModule {}
