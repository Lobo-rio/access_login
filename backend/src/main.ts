import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({ 
    origin: ['http://localhost:8080', 'http://172.31.154.16:8080/'],
    methods: ['POST', 'PUT', 'DELETE', 'GET']
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
