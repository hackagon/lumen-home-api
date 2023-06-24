import { UserEntity } from 'apps/sso-service/src/database/entities';
import { CreateUserDto } from 'apps/sso-service/src/domains/dtos';

export const ICreateUserUseCase = Symbol.for('ICreateUserUseCase');
export interface ICreateUserUseCase {
  execute(data: CreateUserDto): Promise<UserEntity>;
}
