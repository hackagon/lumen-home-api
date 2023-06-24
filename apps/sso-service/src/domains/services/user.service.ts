import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { ICreateUserUseCase } from '../usecases';

@Injectable()
export class UserService {
  constructor(
    @Inject(ICreateUserUseCase) private createUserUseCase: ICreateUserUseCase,
  ) {}

  createUser(data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }
}
