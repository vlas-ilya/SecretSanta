import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import {
  applyChanges,
  backup,
  changeLoadingStatus,
  clearBackup,
  setPlayer,
  tryToRestoreFromBackup,
} from '../player.reducer';

import { Player } from '../model/Player';
import { PlayerChange } from '../model/PlayerChange';
import { fetchAction } from '../../../../utils/fetch';
import { plainToClass } from 'class-transformer';
import { update } from '../api/player.api';
import { validateSync } from 'class-validator';

const validator = (change: PlayerChange) => {
  const player = plainToClass(Player, change.player);
  player.applyChanges(change.changes);
  const validationErrors = validateSync(player);
  return validationErrors.map(
    (error) => new ValidationError(error.property, error.constraints?.isLength || ''),
  );
};

const action = (changes: PlayerChange) =>
  fetchAction(
    changeLoadingStatus,
    async (dispatch, state) => {
      if (!state.player.player?.id) {
        return;
      }
      dispatch(applyChanges(changes.changes));
      const player = await update(state.player.player.id, changes.changes);
      dispatch(setPlayer(player));
    },
    {
      onStart: async (dispatch) => dispatch(backup()),
      onFail: async (dispatch) => dispatch(tryToRestoreFromBackup()),
      onFinish: async (dispatch) => dispatch(clearBackup()),
    },
  );

export const changePlayerInfo = usecase(validator, action);
