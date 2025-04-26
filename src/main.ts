import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your React frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true, // If you need to send cookies with the request
  });
  console.log(process.env.PORT, 'process.env.PORT');
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
