import * as cookieParser from 'cookie-parser';
import * as expressStaticGzip from 'express-static-gzip';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.use(
    '/',
    expressStaticGzip(join(__dirname, '..', '..', 'client', 'build'), {
      enableBrotli: true,
    }),
  );
  await app.listen(8081);
}

bootstrap()
  .then(() => console.log('server started'))
  .catch((e) => console.log('start server failed', e));
