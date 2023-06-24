import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'apps/sso-service/src/database/repositories';
import { VerifyTokenDto } from 'apps/sso-service/src/domains/dtos';
import { IVerifyTokenUseCase } from './i-verify-token.usecase';

@Injectable()
export class VerifyTokenUseCase implements IVerifyTokenUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: VerifyTokenDto): Promise<any> {
    return await this.jwtService
      .verifyAsync(data.token, {
        secret: process.env.JWT_SECRET_KEY,
      })
      .then((payload) => {
        return this.userRepository.findByEmail(payload.email);
      })
      .catch((err) => {
        throw new BadRequestException('Token is invalid');
      });
  }
}
