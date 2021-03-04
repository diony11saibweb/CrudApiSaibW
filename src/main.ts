import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { CustomLogger } from './shared/services/logger.service';
import * as compression from 'compression';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: new CustomLogger(),
  });

  app.use(compression());
  // expose static files
  app.useStaticAssets(join(__dirname, '..', 'documents'), {
    prefix: '/documents',
  });
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  // Open API
  const options = new DocumentBuilder()
    .setTitle('API DE TESTE - v1.0')
    .setDescription('SAIBWEB - API NEST')
    .setVersion('1.0.0')
    .addTag('SAIBWEB')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  await app.listen(2001);
}

bootstrap();
