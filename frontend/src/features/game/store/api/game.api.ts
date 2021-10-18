import { GameChangePin, GameId } from 'model';

import { AxiosResponse } from 'axios';
import { Game } from 'model';
import { GameChanges } from 'model';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import fetch from '../../../../utils/fetch';

export const update = async (
  id: GameId,
  changes: GameChangePin | GameChanges,
): Promise<Game> => {
  const response = await fetch(`/api/game/${id}`).put({
    data: changes,
  });
  return extractGame(response.data);
};

export const get = async (id: GameId): Promise<Game> => {
  const response = await fetch(`/api/game/${id}`).get();
  return extractGame(response.data);
};

const extractGame = (data: AxiosResponse) => {
  const [game, errors] = Game.tryCreate(data as AxiosResponse);
  if (errors?.length > 0) {
    throw INVALID_RESPONSE;
  }
  return game!;
};
