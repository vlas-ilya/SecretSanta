import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/features/auth/auth.module';
import { GameModule } from '../src/features/game/game.module';
import { INestApplication } from '@nestjs/common';
import { PlayerModule } from '../src/features/player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { createApp } from './utils';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp('auth');
  }, 90000);

  it('/POST auth/login (game)', async () => {
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    await request(app.getHttpServer())
      .put(`/api/game/${gameIdRes.text}`)
      .send({
        pin: {
          newValue: '12345',
        },
      });
    const loginRes = await request(app.getHttpServer()).post(`/auth/login`).send({
      username: gameIdRes.text,
      password: '12345',
    });
    expect(loginRes.status).toBe(200);

    const accessToken = loginRes.header['set-cookie']
      ?.filter((cookie) => cookie.startsWith('auth-cookie'))[0]
      ?.split(';')?.[0]
      .split('auth-cookie=')?.[1];

    expect(accessToken.length > 0).toBe(true);
  }, 90000);

  it('/POST auth/check_session', async () => {
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    await request(app.getHttpServer())
      .put(`/api/game/${gameIdRes.text}`)
      .send({
        pin: {
          newValue: '12345',
        },
      });
    const loginRes = await request(app.getHttpServer()).post(`/auth/login`).send({
      username: gameIdRes.text,
      password: '12345',
    });

    const accessToken = loginRes.header['set-cookie']
      ?.filter((cookie) => cookie.startsWith('auth-cookie'))[0]
      ?.split(';')?.[0]
      .split('auth-cookie=')?.[1];

    const checkSessionRes = await request(app.getHttpServer())
      .post(`/auth/check_session`)
      .set('cookie', `auth-cookie=${accessToken}`);

    expect(checkSessionRes.status).toBe(200);
    expect(checkSessionRes.text).toBe('true');
  }, 90000);
});
