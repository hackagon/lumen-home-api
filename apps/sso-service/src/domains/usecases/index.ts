import { Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth';
import { UserUseCaseModule } from './user';

export * from './auth';
export * from './user';

@Module({
  imports: [AuthUseCaseModule, UserUseCaseModule],
  exports: [AuthUseCaseModule, UserUseCaseModule],
})
export class UseCasesModule {}
