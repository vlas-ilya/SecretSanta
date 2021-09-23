import { changeLoadingStatus, setGame } from '../reducer';

import { GameChangePin } from '../model/GameChangePin';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { use_Case } from '../../../../utils/usecase/UseCase';

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

export const changeGamePin = use_Case(validator, action);
