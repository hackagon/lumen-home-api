import { EKafkaMessage, EMicroservice } from '@libs/common';
import {
  Body,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { LoginDto, VerifyTokenDto } from 'apps/sso-service/src/domains/dtos';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { ResourceSerialization } from '@libs/infra/serialization/resource.serialization';

@ApiTags('auth')
@Controller('/auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.AGGREGATION_SSO_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(EKafkaMessage.REQUEST_LOGIN);
    this.kafkaClient.subscribeToResponseOf(EKafkaMessage.REQUEST_VERIFY_TOKEN);
    this.kafkaClient.subscribeToResponseOf(
      EKafkaMessage.REQUEST_EXCEPTION_TEST,
    );
    await this.kafkaClient.connect();
  }

  @Post('/login')
  login(@Body() data: LoginDto) {
    return firstValueFrom(
      this.kafkaClient.send(EKafkaMessage.REQUEST_LOGIN, JSON.stringify(data)),
    );
  }

  @Post('/verify-token')
  verifyToken(@Body() data: VerifyTokenDto) {
    return firstValueFrom(
      this.kafkaClient.send(
        EKafkaMessage.REQUEST_VERIFY_TOKEN,
        JSON.stringify(data),
      ),
    );
  }

  @Get('/exception')
  @UseInterceptors(ResourceSerialization)
  handleException() {
    const data = {
      name: 'test----',
    };
    return firstValueFrom(
      this.kafkaClient
        .send(EKafkaMessage.REQUEST_EXCEPTION_TEST, JSON.stringify(data))
        .pipe(
          catchError((error) => {
            return throwError(() => new RpcException(error));
          }),
        ),
    );
  }
}
