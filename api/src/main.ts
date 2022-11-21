import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
  );

  const documentBuilder = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1')
      .addBearerAuth()
      .build();

  const doc = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('documentation', app, doc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3001);
  Logger.log(`Url for Swagger [OpenApi]: ${await app.getUrl()}/docs`);
}
bootstrap();
