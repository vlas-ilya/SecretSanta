import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import { changeLoadingStatus, setPlayer } from '../player.reducer';

import { MutableRefObject } from 'react';
import { PlayerChangePin } from 'model';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/player.api';
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

const action = (
  changePinMessage: PlayerChangePin,
  callback?: MutableRefObject<() => void>,
) =>
  fetchAction(changeLoadingStatus, async (dispatch, state) => {
    if (!state.player.player?.id) {
      return;
    }

    const Player = await update(state.player.player.id, changePinMessage);

    dispatch(setPlayer(Player));

    callback && callback.current();
  });

export const changePlayerPin = usecase(validator, action);
