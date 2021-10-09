import { changeLoadingStatus, setGame } from '../game.reducer';

import { GameId } from 'model';
import { fetchAction } from '../../../../utils/fetch';
import { get } from '../api/game.api';

export const loadGameInfo = (id: GameId) =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const game = await get(id);
    dispatch(setGame(game));
  });
