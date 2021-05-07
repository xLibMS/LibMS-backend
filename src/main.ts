import * as csurf from 'csurf';
import * as helmet from 'helmet';
import { initDomainEventHandlers } from '@modules/domain-event-handlers';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  initDomainEventHandlers();

  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // app.use(helmet());

  // app.use(csurf());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
