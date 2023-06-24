import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { LoginDto, VerifyTokenDto } from '../dtos';
import { ILoginUseCase } from '../usecases/auth/i-login.usecase';
import { IVerifyTokenUseCase } from '../usecases/auth/i-verify-token.usecase';
import { EKafkaMessage, EMicroservice } from '@libs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { stringify } from 'querystring';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(ILoginUseCase) private loginUseCase: ILoginUseCase,
    @Inject(IVerifyTokenUseCase)
    private verifyTokenUseCase: IVerifyTokenUseCase, // @Inject(EMicroservice.AGGREGATION_BOOKING_SERVICE) // private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // this.kafkaClient.subscribeToResponseOf(EKafkaMessage.REQUEST_BOOKING_TEST);
    // await this.kafkaClient.connect();
    // console.log('subscribe request booking test');
  }

  login(data: LoginDto) {
    return this.loginUseCase.execute(data);
  }

  verifyToken(data: VerifyTokenDto) {
    return this.verifyTokenUseCase.execute(data);
  }
}
