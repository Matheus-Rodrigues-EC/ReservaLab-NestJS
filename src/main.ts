/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173',], // front local + produção
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // se usar cookies/autenticação
  });

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
void bootstrap();
