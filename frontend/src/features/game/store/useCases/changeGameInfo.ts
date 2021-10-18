import { ValidationError, usecase } from '../../../../utils/usecase/usecase';
import {
  applyChanges,
  backup,
  changeLoadingStatus,
  clearBackup,
  setGame,
  tryToRestoreFromBackup,
} from '../game.reducer';

import { Game } from 'model';
import { GameChange } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';

const validator = (change: GameChange): ValidationError[] => {
  const game = Game.tryCreate(change.game)[0]!;
  game.applyChanges(change.changes);
  game.title = game.title?.trim() || game.title;
  game.description = game.description?.trim() || game.description;
  return Game.tryCreate(game)[1];
};

const action = (changes: GameChange) =>
  fetchAction(
    changeLoadingStatus,
    changeAlert,
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
