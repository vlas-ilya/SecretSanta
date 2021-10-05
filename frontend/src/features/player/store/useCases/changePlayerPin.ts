import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import { changeLoadingStatus, setPlayer } from '../player.reducer';

import { PlayerChangePin } from '../model/PlayerChangePin';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { validateSync } from 'class-validator';

const validator = (changes: PlayerChangePin) => {
  const message = new PlayerChangePin(
    changes.newPin,
    changes.confirmation,
    changes.oldPin,
  );
  const validationErrors = validateSync(message);
  return validationErrors.map(
    (error) =>
      new ValidationError(
        error.property,
        error.constraints?.isLength || error.constraints?.Match || '',
      ),
  );
};

const action = (changePinMessage: PlayerChangePin, callback?: () => void) =>
  fetchAction(changeLoadingStatus, async (dispatch, state) => {
    if (!state.player.player?.id) {
      return;
    }

    const Player = await update(state.player.player.id, {
      pin: {
        oldValue: changePinMessage.oldPin,
        newValue: changePinMessage.newPin,
      },
    });

    dispatch(setPlayer(Player));

    callback && callback();
  });

export const changePlayerPin = usecase(validator, action);
