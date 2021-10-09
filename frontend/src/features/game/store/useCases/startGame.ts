import { changeLoadingStatus, setGame } from '../game.reducer';

import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';

export const startGame = () =>
  fetchAction(changeLoadingStatus, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, {
      state: 'RUN',
    });

    dispatch(setGame(game));
  });
