import { AuthEntity } from 'apps/sso-service/src/database/entities';
import { VerifyTokenDto } from 'apps/sso-service/src/domains/dtos';

export const IVerifyTokenUseCase = Symbol.for('IVerifyTokenUseCase');
export interface IVerifyTokenUseCase {
  execute(data: VerifyTokenDto): Promise<AuthEntity>;
}
