import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    console.log(exception);

    // const { response: error }: any = exception.getError();
    // const ctx = host.switchToHttp();
    // const response: any = ctx.getResponse<Response>();

    // response.status(error.statusCode).send(error);
  }
}
