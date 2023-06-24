import {
  BadRequestException,
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import {
  AllExceptionsFilter,
  RpcExceptionFilter,
} from '../exception/all-exceptions.filter';
import _ from 'lodash';

const setUpApplication = (app: INestApplication) => {
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
    }),
  );

  // app.useGlobalFilters(new RpcExceptionFilter());
  // app.useGlobalInterceptors(new ResourceSerialization());

  const configService = app.get(ConfigService);
  const port = _.parseInt(configService.get('PORT'), 10);

  return {
    port,
    logInfo: () =>
      console.table({
        port,
        service: configService.get('SERVICE_NAME'),
      }),
  };
};

export default setUpApplication;
