import setUpApplication from '@libs/infra/setup';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';
import { MainModule } from './main.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(MainModule);
    const { port, logInfo } = setUpApplication(app);
    app.useGlobalFilters(new RpcExceptionFilter());

    const config = new DocumentBuilder()
      .setTitle('API for lumen app')
      .setDescription('The API for lumen app description')
      .setVersion('1.0')
      // .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(port);
    logInfo();
  } catch (error) {
    const stack = error instanceof Error ? error.stack : '';
    Logger.error(`❌  Error starting server, ${error}`, stack, 'Bootstrap');
    process.exit();
  }
}
bootstrap();
