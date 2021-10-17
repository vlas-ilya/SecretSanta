import { changeLoadingStatus, setGame } from '../game.reducer';

import { GameState } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';

export const startGame = () =>
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, {
      state: {
        value: GameState.RUN,
      },
    });

    dispatch(setGame(game));
  });
