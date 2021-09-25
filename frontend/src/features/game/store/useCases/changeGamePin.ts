import { ValidationError, usecase } from '../../../../utils/usecase/UseCase';
import { changeLoadingStatus, setGame } from '../reducer';

import { GameChangePin } from '../model/GameChangePin';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
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

const action = (changePinMessage: GameChangePin, callback?: () => void) =>
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

    callback && callback();
  });

export const changeGamePin = usecase(validator, action);
