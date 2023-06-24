import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { EKafkaMessage, EMicroservice } from '@libs/common';

@Injectable()
export class SsoAdapter {
  constructor(
    @Inject(EMicroservice.AGGREGATION_SSO_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(EKafkaMessage.REQUEST_VERIFY_TOKEN);
    await this.kafkaClient.connect();
  }

  async verifyToken(token: string) {
    return await firstValueFrom(
      this.kafkaClient
        .send(EKafkaMessage.REQUEST_VERIFY_TOKEN, JSON.stringify({ token }))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
