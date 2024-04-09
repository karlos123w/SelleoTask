import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const packageJson = fs.readFileSync(`package.json`, `utf8`);
const version = JSON.parse(packageJson).version;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3005;

  const config = new DocumentBuilder()
    .setTitle('agroPlanner')
    .setDescription('The agroPlanner Api')
    .setVersion('1.0')
    .addTag('agroPlanner Tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors();





await app.listen(port, async () => {
  console.log(`server version: ${version}`);
});

}

bootstrap();