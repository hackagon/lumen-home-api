import { EKafkaMessage } from '@libs/common';
import { ResourceSerialization } from '@libs/infra/serialization/resource.serialization';
import {
  Body,
  Controller,
  GatewayTimeoutException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '../domains/dtos';
import { UserService } from '../domains/services/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ResourceSerialization)
  @MessagePattern(EKafkaMessage.REQUEST_CREATE_USER)
  async createUser(@Body() data: CreateUserDto) {
    console.log(data);

    return await this.userService.createUser(data);
  }
}
