import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserEntity } from 'apps/sso-service/src/database/entities';
import { UserRepository } from 'apps/sso-service/src/database/repositories';
import { CreateUserDto } from 'apps/sso-service/src/domains/dtos';
import { ICreateUserUseCase } from './i-create-user.usecase';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(data.email, false);
    if (user) throw new RpcException(new BadRequestException('Exist user'));

    return this.userRepository.create(data);
  }
}
