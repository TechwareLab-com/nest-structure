import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT')
    ? configService.get<number>('PORT')
    : 80;
  await app.listen(PORT);
}
bootstrap();
