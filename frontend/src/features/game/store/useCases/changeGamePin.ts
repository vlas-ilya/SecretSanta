import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import { changeLoadingStatus, setGame } from '../reducer';

import { GameChangePin } from '../model/GameChangePin';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { validateSync } from 'class-validator';
import { MutableRefObject } from 'react';

const validator = (changes: GameChangePin) => {
  const message = new GameChangePin(changes.newPin, changes.confirmation, changes.oldPin);
  const validationErrors = validateSync(message);
  return validationErrors.map(
    (error) =>
      new ValidationError(
        error.property,
        error.constraints?.isLength || error.constraints?.Match || '',
      ),
  );
};

const action = (changePinMessage: GameChangePin, callback?: MutableRefObject<() => void>) =>
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

    callback && callback.current();
  });

export const changeGamePin = usecase(validator, action);
