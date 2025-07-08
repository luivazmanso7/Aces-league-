import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.1.236:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Permitir cookies
  });

  // Configurar filtro global de exceções
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configurar interceptor global de logging
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Configurar validation pipe global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    exceptionFactory: (errors) => {
      const result = errors.map((error) => ({
        property: error.property,
        value: error.value,
        constraints: error.constraints,
      }));
      logger.error('Validation failed:', JSON.stringify(result, null, 2));
      return new Error(`Validation failed: ${JSON.stringify(result)}`);
    },
  }));

  // Prefixo global para API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  logger.log(`🚀 Servidor rodando na porta ${port}`);
  logger.log(`📚 API disponível em: http://localhost:${port}/api`);
}

bootstrap();