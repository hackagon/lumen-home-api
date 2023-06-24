import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity, UserEntity } from '../entities';
import { AuthRepository } from './auth.repository';
import { UserRepository } from './user.repository';

export * from './auth.repository';
export * from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, UserEntity])],
  providers: [AuthRepository, UserRepository],
  exports: [AuthRepository, UserRepository],
})
export class RepositoryModule {}
