import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './cmn/http/DefHttpException';
import { HttpResponseInterceptor } from './cmn/http/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './cmn/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  app.enableCors();
  app.enableVersioning();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
