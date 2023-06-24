import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { ControllerModule } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    // kafka

    // Controller Module
    ControllerModule,
  ],
})
export class MainModule {}
