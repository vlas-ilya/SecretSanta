import {
  applyChanges,
  backup,
  changeLoadingStatus,
  clearBackup,
  setPlayer,
  tryToRestoreFromBackup,
} from '../player.reducer';

import { PlayerChange } from '../model/PlayerChange';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { use_Case } from '../../../../utils/usecase/UseCase';

const validator = (changes: PlayerChange) => {
  return null;
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
      onStart: async (dispatch, state) => dispatch(backup()),
      onFail: async (dispatch, state) => dispatch(tryToRestoreFromBackup()),
      onFinish: async (dispatch, state) => dispatch(clearBackup()),
    },
  );

export const changePlayerInfo = use_Case(validator, action);
