import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicator,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => new SimpleHealthIndicator().check('application'),
    ]);
  }
}

class SimpleHealthIndicator extends HealthIndicator {
  public check(key: string) {
    return super.getStatus(key, true, { message: 'Up and running' });
  }
}
