import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './cmn/http/exception/DefHttpException';
import { HttpResponseInterceptor } from './cmn/http/interceptor/response.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './cmn/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpErrorType } from './cmn/http/http-error-type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  app.enableCors();
  app.enableVersioning();
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new HttpResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorsMessages = {};
        errors.forEach((error) => {
          const constraints = error.constraints;
          Object.keys(constraints).forEach((key) => {
            errorsMessages[error.property] = constraints[key];
          });
        });

        return new BadRequestException({
          statusCode: 400,
          errorType: HttpErrorType[400],
          message: errorsMessages,
        });
      },
      stopAtFirstError: true,
    }),
  );
  const openApiConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
