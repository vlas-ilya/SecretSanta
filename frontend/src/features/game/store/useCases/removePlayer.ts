import { changeLoadingStatus, setGame } from '../game.reducer';

import { PlayerId } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { update } from '../api/game.api';

export const removePlayer = (removedPlayerId: PlayerId) =>
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch, state) => {
    if (!state.game.game?.id) {
      return;
    }

    const game = await update(state.game.game.id, {
      removedPlayerId,
    });

    dispatch(setGame(game));
  });
