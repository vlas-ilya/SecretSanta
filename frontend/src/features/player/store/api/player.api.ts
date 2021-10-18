import { PlayerChangePin, PlayerId } from 'model';

import { AxiosResponse } from 'axios';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import { Player } from 'model';
import { PlayerChanges } from 'model';
import fetch from '../../../../utils/fetch';

export const get = async (id: PlayerId): Promise<Player> => {
  const response = await fetch(`/api/player/${id}`).get();
  return extractPlayer(response.data);
};

export const update = async (
  id: PlayerId,
  changes: PlayerChangePin | PlayerChanges,
): Promise<Player> => {
  const response = await fetch(`/api/player/${id}`).put({
    data: changes,
  });
  return extractPlayer(response.data);
};

const extractPlayer = (data: AxiosResponse) => {
  const [player, errors] = Player.tryCreate(data);
  if (errors?.length > 0) {
    throw INVALID_RESPONSE;
  }
  return player!;
};
