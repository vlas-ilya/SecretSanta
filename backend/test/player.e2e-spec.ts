import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { GameVo } from '../src/features/game/model/vo/GameVo';
import { INestApplication } from '@nestjs/common';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { login } from './utils';

describe('PlayerController (e2e)', () => {
  let app: INestApplication;
  let game: GameVo;

  beforeAll(async () => {
    console.log(__dirname + '/../db/game.sqlite3');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  }, 90000);

  beforeEach(async () => {
    const gameIdRes = await request(app.getHttpServer()).post('/api/game');
    const accessToken = await login(app, gameIdRes.text);
    const gameRes = await request(app.getHttpServer())
      .get(`/api/game/${gameIdRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`);
    game = gameRes.body;
  });

  it('/POST api/player/register/:id', async () => {
    const playerIdRes = await request(app.getHttpServer()).get(
      `/api/player/register/${game.registrationId}`,
    );
    expect(playerIdRes.status).toBe(302);
    expect(isUUID(playerIdRes.text.substr(30))).toBe(true);
  });

  it('/GET api/player/:id', async () => {
    const playerIdRes = await request(app.getHttpServer()).get(
      `/api/player/register/${game.registrationId}`,
    );
    const accessToken = await login(app, playerIdRes.text.substr(30));
    const playerRes = await request(app.getHttpServer())
      .get(`/api/player/${playerIdRes.text.substr(30)}`)
      .set('cookie', `auth-cookie=${accessToken}`);
    expect(playerRes.status).toBe(200);
    expect(playerRes.body.id).toBe(playerIdRes.text.substr(30));
    expect(playerRes.body.hasPassword).toBe(false);
    expect(playerRes.body.state).toBe('INIT');
    expect(playerRes.body.game.id).toBe(game.id);
  });

  it('/PUT api/player/:id', async () => {
    const name = 'Test Test';
    const wish = 'Test test test test Test test test test';
    const taboo = 'Test test test test Test test test test Test test test test';
    const playerIdRes = await request(app.getHttpServer()).get(
      `/api/player/register/${game.registrationId}`,
    );
    const accessToken = await login(app, playerIdRes.text.substr(30));
    const playerRes = await request(app.getHttpServer())
      .put(`/api/player/${playerIdRes.text.substr(30)}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        name: {
          value: name,
        },
        wish: {
          value: wish,
        },
        taboo: {
          value: taboo,
        },
      });
    expect(playerRes.status).toBe(200);
    expect(playerRes.body.id).toBe(playerIdRes.text.substr(30));
    expect(playerRes.body.hasPassword).toBe(false);
    expect(playerRes.body.state).toBe('ACTIVE');
    expect(playerRes.body.game.id).toBe(game.id);
    expect(playerRes.body.name).toBe(name);
    expect(playerRes.body.wish).toBe(wish);
    expect(playerRes.body.taboo).toBe(taboo);
  });

  it('/PUT api/player/:id (pin)', async () => {
    const pin = '12345';
    const playerIdRes = await request(app.getHttpServer()).get(
      `/api/player/register/${game.registrationId}`,
    );
    const accessToken = await login(app, playerIdRes.text.substr(30));
    const playerRes = await request(app.getHttpServer())
      .put(`/api/player/${playerIdRes.text.substr(30)}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        pin: {
          newValue: pin,
        },
      });
    expect(playerRes.status).toBe(200);
    expect(playerRes.body.hasPassword).toBe(true);
    expect(playerRes.body.state).toBe('ACTIVE');
  });

  it('/PUT api/player/:id (after changing pin)', async () => {
    const pin = '12345';
    const playerIdRes = await request(app.getHttpServer()).get(
      `/api/player/register/${game.registrationId}`,
    );
    const accessToken = await login(app, playerIdRes.text.substr(30));
    const playerUpdateRes = await request(app.getHttpServer())
      .put(`/api/player/${playerIdRes.text.substr(30)}`)
      .set('cookie', `auth-cookie=${accessToken}`)
      .send({
        pin: {
          newValue: pin,
        },
      });
    expect(playerUpdateRes.status).toBe(200);

    const newAccessToken = await login(app, playerIdRes.text.substr(30), pin);
    const playerRes = await request(app.getHttpServer())
      .get(`/api/player/${playerIdRes.text.substr(30)}`)
      .set('cookie', `auth-cookie=${newAccessToken}`);

    expect(playerRes.status).toBe(200);
    expect(playerRes.body.id).toBe(playerIdRes.text.substr(30));
    expect(playerRes.body.hasPassword).toBe(true);
    expect(playerRes.body.state).toBe('ACTIVE');
    expect(playerRes.body.game.id).toBe(game.id);
  });
});
