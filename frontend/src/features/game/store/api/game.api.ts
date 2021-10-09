import { GameChangePin, GameId, GamePin } from 'model';

import { AxiosResponse } from 'axios';
import { Game } from 'model';
import { GameChanges } from 'model';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import fetch from '../../../../utils/fetch';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const update = async (
  id: GameId,
  changes:
    | GameChangePin
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
