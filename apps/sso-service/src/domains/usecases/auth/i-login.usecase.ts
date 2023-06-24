import { AuthEntity } from 'apps/sso-service/src/database/entities';
import { LoginDto } from 'apps/sso-service/src/domains/dtos';

export const ILoginUseCase = Symbol.for('ILoginUseCase');
export interface ILoginUseCase {
  execute(data: LoginDto): Promise<AuthEntity>;
}
