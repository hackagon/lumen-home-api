import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import _ from 'lodash';

@Injectable()
export class CollectionSerialization implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      switchMap((response) => {
        if (!response) return of(response);

        return [
          {
            status: 'success',
            ...response,
          },
        ];
      }),
    );
  }
}
