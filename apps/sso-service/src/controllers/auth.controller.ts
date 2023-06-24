import { EKafkaMessage } from '@libs/common';
import { ResourceSerialization } from '@libs/infra/serialization/resource.serialization';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto, VerifyTokenDto } from '../domains/dtos';
import { AuthService } from '../domains/services';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ResourceSerialization)
  @MessagePattern(EKafkaMessage.REQUEST_LOGIN)
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseInterceptors(ResourceSerialization)
  @MessagePattern(EKafkaMessage.REQUEST_VERIFY_TOKEN)
  async verifyToken(@Body() data: VerifyTokenDto) {
    return await this.authService.verifyToken(data);
  }

  @MessagePattern(EKafkaMessage.REQUEST_EXCEPTION_TEST)
  verifyException(@Body() data: any) {
    console.log('get message from aggregation');
    // return this.authService.verifyException(data);
  }
}
