import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import { GameChangesVo, GamePinVo, GameVo } from '../src/features/game/model/vo/GameVo';
import {
  PlayerChangesVo,
  PlayerPinVo,
  PlayerVo,
} from '../src/features/player/model/vo/PlayerVo';
import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { createApp, login } from './utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { GameModule } from '../src/features/game/game.module';
import { PlayerModule } from '../src/features/player/player.module';
import { AuthModule } from '../src/features/auth/auth.module';

describe('Happy Flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp('happy-flow');
  }, 90000);

  const createGame = async (): Promise<{
    game: GameVo;
    accessToken: string;
  }> => {
    const createGameRes = await request(app.getHttpServer()).post('/api/game');
    expect(createGameRes.status).toBe(201);

    const accessToken = await login(app, createGameRes.text);
    const gameRes = await request(app.getHttpServer())
      .get(`/api/game/${createGameRes.text}`)
      .set('cookie', `auth-cookie=${accessToken}`);
    expect(gameRes.status).toBe(200);

    return {
      game: gameRes.body,
      accessToken,
    };
  };

  const createPlayer = async (game: {
    game: GameVo;
    accessToken: string;
  }): Promise<{
    player: PlayerVo;
    accessToken: string;
  }> => {
    const createPlayerRes = await request(app.getHttpServer()).get(
      `/api/player/register/${game.game.registrationId}`,
    );
    expect(createPlayerRes.status).toBe(302);
    const accessToken = await login(app, createPlayerRes.text.substr(30));

    const playerRes = await request(app.getHttpServer())
      .get(`/api/player/${createPlayerRes.text.substr(30)}`)
      .set('cookie', `auth-cookie=${accessToken}`);

    expect(playerRes.status).toBe(200);
    return {
      player: playerRes.body,
      accessToken,
    };
  };

  const getPlayer = async (player: {
    player: PlayerVo;
    accessToken: string;
  }): Promise<{
    player: PlayerVo;
    accessToken: string;
  }> => {
    const playerRes = await request(app.getHttpServer())
      .get(`/api/player/${player.player.id}`)
      .set('cookie', `auth-cookie=${player.accessToken}`);

    expect(playerRes.status).toBe(200);
    return {
      player: playerRes.body,
      accessToken: player.accessToken,
    };
  };

  const changePlayer = async (
    player: {
      player: PlayerVo;
      accessToken: string;
    },
    changes: PlayerChangesVo,
  ): Promise<{
    player: PlayerVo;
    accessToken: string;
  }> => {
    const playerRes = await request(app.getHttpServer())
      .put(`/api/player/${player.player.id}`)
      .send(changes)
      .set('cookie', `auth-cookie=${player.accessToken}`);

    expect(playerRes.status).toBe(200);
    Object.keys(changes).forEach((change) =>
      expect(changes[change].value).toBe(playerRes.body[change]),
    );

    return {
      player: playerRes.body,
      accessToken: player.accessToken,
    };
  };

  const changePlayerPin = async (
    player: {
      player: PlayerVo;
      accessToken: string;
    },
    pin: PlayerPinVo,
    oldPin?: PlayerPinVo,
  ): Promise<void> => {
    const playerRes = await request(app.getHttpServer())
      .put(`/api/player/${player.player.id}`)
      .set('cookie', `auth-cookie=${player.accessToken}`)
      .send({
        pin: {
          newValue: pin,
          oldValue: oldPin,
        },
      });

    expect(playerRes.status).toBe(200);
  };

  const changeGame = async (
    game: {
      game: GameVo;
      accessToken: string;
    },
    changes: GameChangesVo,
  ): Promise<{
    game: GameVo;
    accessToken: string;
  }> => {
    const gameUpdateResponse = await request(app.getHttpServer())
      .put(`/api/game/${game.game.id}`)
      .set('cookie', `auth-cookie=${game.accessToken}`)
      .send(changes);

    expect(gameUpdateResponse.status).toBe(200);
    Object.keys(changes).forEach((change) =>
      expect(changes[change].value).toBe(gameUpdateResponse.body[change]),
    );

    return {
      game: gameUpdateResponse.body,
      accessToken: game.accessToken,
    };
  };

  const changeGamePin = async (
    game: {
      game: GameVo;
      accessToken: string;
    },
    pin: GamePinVo,
    oldPin?: GamePinVo,
  ): Promise<void> => {
    const gameUpdateResponse = await request(app.getHttpServer())
      .put(`/api/game/${game.game.id}`)
      .set('cookie', `auth-cookie=${game.accessToken}`)
      .send({
        pin: {
          newValue: pin,
          oldValue: oldPin,
        },
      });

    expect(gameUpdateResponse.status).toBe(200);
  };

  it('Create Game -> Create 5 players -> Change players -> Change Game -> Start Game -> Check players', async () => {
    const game = await createGame();

    const player1 = await createPlayer(game);
    const player2 = await createPlayer(game);
    const player3 = await createPlayer(game);
    const player4 = await createPlayer(game);
    const player5 = await createPlayer(game);

    await changePlayerPin(player1, '11111');
    await changePlayerPin(player2, '22222');
    await changePlayerPin(player2, '33333', '22222');

    const newPlayer1 = await changePlayer(player1, { name: { value: 'player1' } });
    const newPlayer2 = await changePlayer(player2, { wish: { value: 'wish player2' } });
    const newPlayer3 = await changePlayer(player3, { taboo: { value: 'taboo player3' } });
    const newPlayer4 = await changePlayer(player4, {
      wish: { value: 'wish player4' },
      taboo: { value: 'taboo player4' },
    });
    const newPlayer5 = await changePlayer(player5, {
      name: { value: 'player5' },
      wish: { value: 'wish player5' },
      taboo: { value: 'taboo player5' },
    });

    const newGameWithTitle = await changeGame(game, {
      title: {
        value: 'test test test',
      },
    });

    await changeGamePin(game, '33333');

    const newGameWithDescription = await changeGame(game, {
      description: {
        value: 'test test test test test',
      },
    });

    const newStartedGame = await changeGame(game, {
      state: {
        value: 'RUN',
      },
    });

    const startedPlayer1 = await getPlayer(newPlayer1);
    expect(startedPlayer1.player.target !== null).toBe(true);
  }, 90000);
});
