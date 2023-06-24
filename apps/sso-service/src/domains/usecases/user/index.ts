import { Module } from '@nestjs/common';
import { RepositoryModule } from 'apps/sso-service/src/database/repositories';
import { CreateUserUseCase } from './create-user.usecase';
import { ICreateUserUseCase } from './i-create-user.usecase';

export * from './i-create-user.usecase';
export * from './create-user.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: ICreateUserUseCase,
      useClass: CreateUserUseCase,
    },
  ],
  exports: [ICreateUserUseCase],
})
export class UserUseCaseModule {}
