import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(8080);
}

bootstrap()
  .then(() => console.log('server started'))
  .catch((e) => console.log('start server failed', e));
