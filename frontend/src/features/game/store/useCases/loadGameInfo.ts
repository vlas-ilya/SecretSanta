import { changeLoadingStatus, setGame } from '../game.reducer';

import { GameId } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { get } from '../api/game.api';

export const loadGameInfo = (id: GameId) =>
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch) => {
    const game = await get(id);
    dispatch(setGame(game));
  });
