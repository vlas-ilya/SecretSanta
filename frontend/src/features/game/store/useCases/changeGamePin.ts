import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import { changeLoadingStatus, setGame } from '../game.reducer';

import { GameChangePin } from 'model';
import { MutableRefObject } from 'react';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';
import { validateSync } from 'class-validator';

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

const action = (
  changePinMessage: GameChangePin,
  callback?: MutableRefObject<() => void>,
) =>
  fetchAction(changeLoadingStatus, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, changePinMessage);

    dispatch(setGame(game));

    callback && callback.current();
  });

export const changeGamePin = usecase(validator, action);
