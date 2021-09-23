import { changeLoadingStatus, setGame } from '../reducer';

import { GameId } from '../model/GameTypes';
import { fetchAction } from '../../../../utils/fetch';
import { get } from '../api/api';

export const loadGameInfo = (id: GameId) =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const game = await get(id);
    dispatch(setGame(game));
  });
