import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // En desarrollo: permitir todos los orígenes, en producción usar variable de entorno
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_ORIGIN?.split(',') || ['http://localhost:3000']
      : true; // Permite todos los orígenes en desarrollo

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.use('/uploads', express.static('uploads'));
  await app.listen(3001);
}
bootstrap();
