import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}
bootstrap();
