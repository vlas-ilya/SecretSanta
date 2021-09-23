import { changeLoadingStatus, setGame } from '../reducer';

import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/api';

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
