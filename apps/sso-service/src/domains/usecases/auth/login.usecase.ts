import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthRepository,
  UserRepository,
} from 'apps/sso-service/src/database/repositories';
import { LoginDto } from 'apps/sso-service/src/domains/dtos';
import { ILoginUseCase } from './i-login.usecase';
import bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: LoginDto): Promise<any> {
    const { email, password } = data;
    const ttl = data.ttl || 604800;

    const foundUser = await this.userRepository.findByEmail(email);
    if (!foundUser) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    const isMatched = await bcrypt.compare(password, foundUser.password);
    if (!isMatched) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload = {
      email,
    };

    const jwt = this.jwtService.sign(payload, {
      expiresIn: ttl,
    });

    const auth = this.authRepository.create({
      jwt,
      ttl,
    });

    return auth;
  }
}
