import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://pokeagent-frontend.onrender.com', // Permite solo peticiones desde Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Permitir envío de cookies si es necesario
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
