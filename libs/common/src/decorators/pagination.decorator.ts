import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import _ from 'lodash';
import {
  IPaginationLinks,
  IPaginationMeta,
  ObjectLiteral,
} from 'nestjs-typeorm-paginate';

export interface IPaginationParamteters {
  limit: number;
  page: number;
  route: string;
}

export const PaginationDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IPaginationParamteters => {
    const request: Request = ctx.switchToHttp().getRequest();

    const limit = _.get(request, 'query.limit', 20) as number;
    const page = _.get(request, 'query.page', 1) as number;
    const route = request.originalUrl;

    return { limit, page, route };
  },
);

export class Pagination<
  PaginationObject,
  T extends ObjectLiteral = IPaginationMeta,
> {
  constructor(
    public readonly meta: T,
    public readonly links?: IPaginationLinks,
    public readonly data?: PaginationObject[],
  ) {}
}
