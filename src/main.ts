import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException, HttpExceptionFilter } from './exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        excludeExtraneousValues: false,
        exposeUnsetFields: false,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(validationErrors);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3002);
}
bootstrap();
