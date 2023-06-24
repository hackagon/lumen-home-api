import { Module } from '@nestjs/common';
import { UseCasesModule } from '../usecases';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import clientModuleOptions from '../../config/kafka';

export * from './auth.service';

@Module({
  imports: [UseCasesModule],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class ServiceModule {}
