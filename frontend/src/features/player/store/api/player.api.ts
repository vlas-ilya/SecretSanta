import { PlayerId, PlayerPin } from 'model';

import { AxiosResponse } from 'axios';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import { Player } from 'model';
import { PlayerChanges } from 'model';
import fetch from '../../../../utils/fetch';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const get = async (id: PlayerId): Promise<Player> => {
  const response = await fetch(`/api/player/${id}`).get();
  const player = plainToClass(Player, response.data as AxiosResponse);
  const errors = await validate(player);
  if (errors.length > 0) {
    throw INVALID_RESPONSE;
  }
  return player;
};

export const update = async (
  id: PlayerId,
  changes:
    | {
        pin: {
          oldValue?: PlayerPin;
          newValue: PlayerPin;
        };
      }
    | PlayerChanges,
): Promise<Player> => {
  const response = await fetch(`/api/player/${id}`).put({
    data: changes,
  });
  const player = plainToClass(Player, response.data as AxiosResponse);
  const errors = await validate(player);
  if (errors.length > 0) {
    throw INVALID_RESPONSE;
  }
  return player;
};
