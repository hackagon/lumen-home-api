import { EKafkaMessage, EMicroservice } from '@libs/common';
import { Body, Inject, OnModuleInit, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/sso-service/src/domains/dtos';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.AGGREGATION_SSO_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(EKafkaMessage.REQUEST_CREATE_USER);
    await this.kafkaClient.connect();
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return firstValueFrom(
      this.kafkaClient
        .send(EKafkaMessage.REQUEST_CREATE_USER, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
}
