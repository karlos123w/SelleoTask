import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { AuthMiddleware } from './auth/auth.middleware';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packageJson = fs.readFileSync(`package.json`, `utf8`);
  const version = JSON.parse(packageJson).version;

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || process.env.PORT;
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors();
  await app.listen(port, async () => {
    console.log(`server version ${version}, on port:${port}:`);
  });
  app.use(AuthMiddleware);
}
bootstrap();
