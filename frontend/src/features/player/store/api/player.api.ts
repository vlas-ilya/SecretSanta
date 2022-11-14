import { Player, PlayerChangePin, PlayerChanges, PlayerId } from 'model';

import { AxiosResponse } from 'axios';
import { INVALID_RESPONSE } from '../../../../utils/constants';
import fetch from '../../../../utils/fetch';
import { retryWithLogin } from '../../../session/store/api/session.api';

export const get = async (id: PlayerId): Promise<Player> => {
  const response = await fetch(`/api/player/${id}`).get();
  return extractPlayer(response.data);
};

export const update = async (
  id: PlayerId,
  changes: PlayerChangePin | PlayerChanges,
): Promise<Player> => {
  return await retryWithLogin(id, async () => {
    const response = await fetch(`/api/player/${id}`).put({
      data: changes,
    });
    return extractPlayer(response.data);
  });
};

const extractPlayer = (data: AxiosResponse) => {
  const [player, errors] = Player.tryCreate(data);
  if (errors?.length > 0) {
    throw INVALID_RESPONSE;
  }
  return player!;
};
