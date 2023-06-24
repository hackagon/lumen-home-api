import { Module } from '@nestjs/common';
import { ServiceModule } from '../domains/services';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, UserController],
})
export class ControllerModule {}
