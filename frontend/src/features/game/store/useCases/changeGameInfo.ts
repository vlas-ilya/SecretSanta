import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import {
  applyChanges,
  backup,
  changeLoadingStatus,
  clearBackup,
  setGame,
  tryToRestoreFromBackup,
} from '../game.reducer';

import { Game } from '../model/Game';
import { GameChange } from '../model/GameChange';
import { fetchAction } from '../../../../utils/fetch';
import { plainToClass } from 'class-transformer';
import { update } from '../api/game.api';
import { validateSync } from 'class-validator';

const validator = (change: GameChange): ValidationError[] => {
  const game = plainToClass(Game, change.game);
  game.applyChanges(change.changes);
  const validationErrors = validateSync(game);
  return validationErrors.map(
    (error) => new ValidationError(error.property, error.constraints?.isLength || ''),
  );
};

const action = (changes: GameChange) =>
  fetchAction(
    changeLoadingStatus,
    async (dispatch, state) => {
      if (!state.game.game?.id) {
        return;
      }
      dispatch(applyChanges(changes.changes));
      const game = await update(state.game.game.id, changes.changes);
      dispatch(setGame(game));
    },
    {
      onStart: async (dispatch) => dispatch(backup()),
      onFail: async (dispatch) => dispatch(tryToRestoreFromBackup()),
      onFinish: async (dispatch) => dispatch(clearBackup()),
    },
  );

export const changeGameInfo = usecase(validator, action);
