import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = '/api/v1';

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, 'localhost');
  console.log(`Server running on port ${await app.getUrl()}` + prefix);
}

bootstrap();
