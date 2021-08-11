import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { createApp, login } from './utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { GameModule } from '../src/features/game/game.module';
import { PlayerModule } from '../src/features/player/player.module';
import { AuthModule } from '../src/features/auth/auth.module';

describe('GameController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp('game');
  }, 90000);

  it('/POST api/game', async () => {
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    expect(gameIdRes.status).toBe(201);
    expect(isUUID(gameIdRes.text)).toBe(true);
  });

  it('/GET api/game/:id', async () => {
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    const accessToken = await login(app, gameIdRes.text);
    const gameRes = await request(app.getHttpServer())
      .get(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`);
    expect(gameRes.status).toBe(200);
    expect(isUUID(gameRes.body.registrationId)).toBe(true);
    expect(gameRes.body.id).toBe(gameIdRes.text);
    expect(gameRes.body.state).toBe('INIT');
    expect(gameRes.body.players.length).toBe(0);
    expect(gameRes.body.hasPassword).toBe(false);
    expect(Object.keys(gameRes.body)).toStrictEqual([
      'id',
      'registrationId',
      'state',
      'players',
      'hasPassword',
    ]);
  });

  it('/PUT api/game/:id', async () => {
    const title = 'Test test test';
    const description = 'Test test test Test test test Test test test';
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    const accessToken = await login(app, gameIdRes.text);
    const gameUpdateRes = await request(app.getHttpServer())
      .put(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        title: {
          value: title,
        },
        description: {
          value: description,
        },
      });

    expect(gameUpdateRes.status).toBe(200);
    expect(isUUID(gameUpdateRes.body.registrationId)).toBe(true);
    expect(gameUpdateRes.body.id).toBe(gameIdRes.text);
    expect(gameUpdateRes.body.state).toBe('INIT');
    expect(gameUpdateRes.body.players.length).toBe(0);
    expect(gameUpdateRes.body.hasPassword).toBe(false);
    expect(gameUpdateRes.body.title).toBe(title);
    expect(gameUpdateRes.body.description).toBe(description);
    expect(Object.keys(gameUpdateRes.body)).toStrictEqual([
      'id',
      'registrationId',
      'state',
      'players',
      'hasPassword',
      'title',
      'description',
    ]);
  });

  it('/PUT api/game/:id (pin)', async () => {
    const pin = '12345';
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    const accessToken = await login(app, gameIdRes.text);
    const gameUpdateRes = await request(app.getHttpServer())
      .put(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        pin: {
          newValue: pin,
        },
      });
    expect(gameUpdateRes.status).toBe(200);
    const newAccessToken = await login(app, gameIdRes.text, pin);
    expect(newAccessToken.length > 0).toBe(true);
  });

  it('/GET api/game/:id (with pin)', async () => {
    const pin = '12345';
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    const accessToken = await login(app, gameIdRes.text);
    const gameUpdateRes = await request(app.getHttpServer())
      .put(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        pin: {
          newValue: pin,
        },
      });

    expect(gameUpdateRes.status).toBe(200);

    const newAccessToken = await login(app, gameIdRes.text, pin);

    const gameRes = await request(app.getHttpServer())
      .get(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${newAccessToken}`);

    expect(gameRes.status).toBe(200);
    expect(isUUID(gameRes.body.registrationId)).toBe(true);
    expect(gameRes.body.id).toBe(gameIdRes.text);
    expect(gameRes.body.state).toBe('INIT');
    expect(gameRes.body.players.length).toBe(0);
    expect(gameRes.body.hasPassword).toBe(true);
    expect(Object.keys(gameRes.body)).toStrictEqual([
      'id',
      'registrationId',
      'state',
      'players',
      'hasPassword',
    ]);
  });

  it('/PUT api/game/:id (start game)', async () => {
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    const accessToken = await login(app, gameIdRes.text);
    const gameUpdateRes = await request(app.getHttpServer())
      .put(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        state: {
          value: 'RUN',
        },
      });
    expect(gameUpdateRes.status).toBe(200);
    expect(gameUpdateRes.body.state).toBe('RUN');
  });
});
