import { GameId, GamePin } from '../../../game/store/model/GameTypes';
import { PlayerId, PlayerPin } from '../../../player/store/model/PlayerTypes';

import fetch from '../../../../utils/fetch';

export const login = async (
  id: GameId | PlayerId,
  pin: GamePin | PlayerPin | undefined,
) => {
  await fetch(`/auth/login`).post({
    data: {
      username: id,
      password: pin || '00000',
    },
  });
};

export const checkSession = async () => {
  await fetch(`/auth/check_session`).post();
};
