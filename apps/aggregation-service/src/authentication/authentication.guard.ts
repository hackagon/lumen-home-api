import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from './authentication.config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SsoAdapter } from '../authentication/sso.adapter';
import _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private ssoAdapter: SsoAdapter) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }
    try {
      const verifyResponse = await this.ssoAdapter.verifyToken(token);
      const user = verifyResponse.data;
      _.set(request, 'userId', user.id);
    } catch {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
