import * as api from '../api/api';

import { GameId, GamePin } from '../../../game/store/model/GameTypes';
import { PlayerId, PlayerPin } from '../../../player/store/model/PlayerTypes';
import { changeHasSession, changeLoadingStatus } from '../reducer';

import { fetchAction } from '../../../../utils/fetch';

export const login = (id: GameId | PlayerId, pin: GamePin | PlayerPin | undefined) =>
  fetchAction(
    changeLoadingStatus,
    async (dispatch) => {
      await api.login(id, pin);
      dispatch(changeHasSession(true));
    },
    undefined,
    false,
  );
