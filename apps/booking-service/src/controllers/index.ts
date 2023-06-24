import { Module } from '@nestjs/common';
import { BookingUseCaseModule } from '../usecases';
import { BookingController } from './booking.controller';

@Module({
  imports: [BookingUseCaseModule],
  controllers: [BookingController],
})
export class ControllerModule {}
