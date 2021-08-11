import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { GameModule } from '../src/features/game/game.module';
import { PlayerModule } from '../src/features/player/player.module';
import { AuthModule } from '../src/features/auth/auth.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';

export const login = async (
  app: any,
  id: string,
  password: string = '00000',
): Promise<string> => {
  const loginRes = await request(app.getHttpServer()).post(`/auth/login`).send({
    username: id,
    password: password,
  });

  return loginRes.header['set-cookie']
    ?.filter((cookie) => cookie.startsWith('auth-cookie'))[0]
    ?.split(';')?.[0]
    .split('auth-cookie=')?.[1];
};

export const createApp: (moduleName: string) => Promise<INestApplication> = async (
  moduleName: string,
) => {
  let app: INestApplication;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: async () =>
          Object.assign(await getConnectionOptions(), {
            autoLoadEntities: true,
            database: `./dist/db/test/game-${moduleName}.sqlite3`,
            synchronize: true,
          }),
      }),
      GameModule,
      PlayerModule,
      AuthModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.use(cookieParser());
  await app.init();
  return app;
};
