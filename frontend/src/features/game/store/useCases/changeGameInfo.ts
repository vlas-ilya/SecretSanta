import {
  applyChanges,
  backup,
  changeLoadingStatus,
  clearBackup,
  setGame,
  tryToRestoreFromBackup,
} from '../reducer';

import { GameChange } from '../model/GameChange';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';
import { use_Case } from '../../../../utils/usecase/UseCase';

const validator = (changes: GameChange) => {
  return null;
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

export const changeGameInfo = use_Case(validator, action);
