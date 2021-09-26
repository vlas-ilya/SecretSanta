import { PlayerId, PlayerPin } from '../model/PlayerTypes';

import { AxiosResponse } from 'axios';
import { GameShortInfo } from '../model/GameShortInfo';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import { Player } from '../model/Player';
import { PlayerChanges } from '../model/PlayerChange';
import fetch from '../../../../utils/fetch';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const get = async (id: PlayerId): Promise<Player> => {
  const response = await fetch(`/api/player/${id}`).get();
  return plainToClass(Player, response.data as AxiosResponse);
};

export const getGameInfo = async (id: PlayerId): Promise<GameShortInfo> => {
  const response = await fetch(`/api/player/${id}/game`).get();
  const game = plainToClass(GameShortInfo, response.data as AxiosResponse);
  const errors = await validate(game);
  if (errors.length > 0) {
    throw INVALID_RESPONSE;
  }
  return game;
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
