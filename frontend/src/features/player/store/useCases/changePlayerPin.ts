import { changeLoadingStatus, setPlayer } from '../player.reducer';

import { MutableRefObject } from 'react';
import { PlayerChangePin } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/player.api';
import { usecase } from '../../../../utils/usecase/usecase';

const validator = (changes: PlayerChangePin) => {
  return PlayerChangePin.tryCreate(changes)[1];
};

const action = (
  changePinMessage: PlayerChangePin,
  callback?: MutableRefObject<() => void>,
) =>
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch, state) => {
    if (!state.player.player?.id) {
      return;
    }

    const Player = await update(state.player.player.id, changePinMessage);

    dispatch(setPlayer(Player));

    callback && callback.current();
  });

export const changePlayerPin = usecase(validator, action);
