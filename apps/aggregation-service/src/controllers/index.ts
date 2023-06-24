import { EKafkaGroup, EMicroservice } from '@libs/common';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from '../logger/my-logger.module';
import { AuthController } from './auth.controller';
import { HealthController } from './health.controller';
import { UserController } from './user.controller';
// import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuard } from '../authentication/authentication.guard';
import { SsoAdapter } from '../authentication/sso.adapter';
import clientModuleOptions from '../config/kafka';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    LoggerModule,
    ClientsModule.register(clientModuleOptions),
  ],
  controllers: [
    AuthController,
    UserController,
    BookingController,
    HealthController,
  ],
  providers: [AuthGuard, SsoAdapter],
})
export class ControllerModule {}
