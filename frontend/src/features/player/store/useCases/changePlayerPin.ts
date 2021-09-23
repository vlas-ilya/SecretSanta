import { changeLoadingStatus, setPlayer } from '../player.reducer';

import { PlayerChangePin } from '../model/PlayerChangePin';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { use_Case } from '../../../../utils/usecase/UseCase';

const validator = (changePinMessage: PlayerChangePin) => {
  return null;
};

const action = (changePinMessage: PlayerChangePin) =>
  fetchAction(changeLoadingStatus, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const player = await update(state.game.game.id, {
      pin: {
        oldValue: changePinMessage.oldValue,
        newValue: changePinMessage.newValue,
      },
    });

    dispatch(setPlayer(player));
  });

const changePlayerPin = use_Case(validator, action);
