import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from 'apps/sso-service/src/database/repositories';
import { ILoginUseCase } from './i-login.usecase';
import { LoginUseCase } from './login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { IVerifyTokenUseCase } from './i-verify-token.usecase';
import { VerifyTokenUseCase } from './verify-token.usecase';

export * from './i-login.usecase';
export * from './login.usecase';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '7d' }
    }),
  ],
  providers: [
    {
      provide: ILoginUseCase,
      useClass: LoginUseCase,
    },
    {
      provide: IVerifyTokenUseCase,
      useClass: VerifyTokenUseCase,
    },
  ],
  exports: [ILoginUseCase, IVerifyTokenUseCase],
})
export class AuthUseCaseModule {}
