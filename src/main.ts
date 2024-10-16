import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJson from '../package.json';
import { AppModule } from './app.module';
import { IAppConfig } from './config';
import { ApplicationExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  app.useGlobalFilters(new ApplicationExceptionFilter());
  const configService = app.get(ConfigService);
  const { apiPort } = configService.get<IAppConfig>('app');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();
  await app.listen(apiPort, () => Logger.log(`Listening at 0.0.0.0:${apiPort}`, 'Server'));
}

bootstrap();
