import { EKafkaGroup } from '@libs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MainModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_HOST],
        },
        consumer: {
          groupId: EKafkaGroup.BOOKING_GROUP,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
