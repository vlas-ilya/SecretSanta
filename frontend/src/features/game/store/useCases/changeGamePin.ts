import { changeLoadingStatus, setGame } from '../reducer';

import { GameChangePin } from '../model/GameChangePin';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { usecase } from '../../../../utils/usecase/UseCase';

const validator = (changePinMessage: GameChangePin) => {
  return null;
};

const action = (changePinMessage: GameChangePin) =>
  fetchAction(changeLoadingStatus, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, {
      pin: {
        oldValue: changePinMessage.oldPin,
        newValue: changePinMessage.newPin,
      },
    });

    dispatch(setGame(game));
  });

export const changeGamePin = usecase(validator, action);
