import { changeLoadingStatus, setGame } from '../game.reducer';

import { GameChangePin } from 'model';
import { MutableRefObject } from 'react';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';
import { usecase } from '../../../../utils/usecase/usecase';

const validator = (changes: GameChangePin) => {
  return  GameChangePin.tryCreate(changes)[1];
};

const action = (
  changePinMessage: GameChangePin,
  callback?: MutableRefObject<() => void>,
) =>
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, changePinMessage);

    dispatch(setGame(game));

    callback && callback.current();
  });

export const changeGamePin = usecase(validator, action);
