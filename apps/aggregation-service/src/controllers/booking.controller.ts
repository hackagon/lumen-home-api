import { EKafkaMessage, EMicroservice } from '@libs/common';
import {
  Body,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { FindAvailableRoomsDto } from 'apps/booking-service/src/dtos/find-available-rooms.dto';
import { AuthGuard } from '../authentication/authentication.guard';
import { BookRoomsDto } from 'apps/booking-service/src/dtos';
import _ from 'lodash';

@ApiTags('booking')
@Controller('/booking')
export class BookingController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.AGGREGATION_BOOKING_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(
      EKafkaMessage.REQUEST_FIND_AVAILABLE_ROOMS,
    );
    this.kafkaClient.subscribeToResponseOf(EKafkaMessage.REQUEST_BOOK_ROOMS);
    await this.kafkaClient.connect();
  }

  // date, page, limit
  @Get('/available-rooms')
  findAvailableRooms(@Query() data: FindAvailableRoomsDto) {
    return firstValueFrom(
      this.kafkaClient
        .send(EKafkaMessage.REQUEST_FIND_AVAILABLE_ROOMS, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  @Post('')
  @UseGuards(AuthGuard)
  bookRooms(@Body() data: BookRoomsDto, @Request() req: Request) {
    const userId = _.get(req, 'userId', '');
    data.userId = userId;

    return firstValueFrom(
      this.kafkaClient
        .send(EKafkaMessage.REQUEST_BOOK_ROOMS, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
}
