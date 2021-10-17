import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import { changeLoadingStatus, setGame } from '../game.reducer';

import { GameChangePin } from 'model';
import { MutableRefObject } from 'react';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';
import { validateSync } from 'class-validator';

const validator = (changes: GameChangePin) => {
  const validationErrors = validateSync(changes);
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
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, changePinMessage);

    dispatch(setGame(game));

    callback && callback.current();
  });

export const changeGamePin = usecase(validator, action);
