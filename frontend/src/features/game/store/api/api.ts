import { GameId, GamePin } from '../model/GameTypes';

import { Game } from '../model/Game';
import { GameChanges } from '../model/GameChange';
import fetch from '../../../../utils/fetch';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import { AxiosResponse } from 'axios';

export const update = async (
  id: GameId,
  changes:
    | {
        pin: {
          oldValue?: GamePin;
          newValue: GamePin;
        };
      }
    | {
        state: 'RUN';
      }
    | GameChanges,
): Promise<Game> => {
  const response = await fetch(`/api/game/${id}`).put({
    data: changes,
  });
  const game = plainToClass(Game, response.data as AxiosResponse);
  const errors = await validate(game);
  if (errors.length > 0) {
    throw INVALID_RESPONSE;
  }
  return game;
};

export const get = async (id: GameId): Promise<Game> => {
  const response = await fetch(`/api/game/${id}`).get();
  const game = plainToClass(Game, response.data as AxiosResponse);
  const errors = await validate(game);
  if (errors.length > 0) {
    throw INVALID_RESPONSE;
  }
  return game;
};
