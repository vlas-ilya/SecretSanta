import { changeLoadingStatus, setGame, setPlayer } from '../player.reducer';

import { PlayerId } from '../model/PlayerTypes';
import { fetchAction } from '../../../../utils/fetch';
import { getGameInfo } from '../api/api';

export const loadGameInfo = (id: PlayerId) =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const game = await getGameInfo(id);
    dispatch(setGame(game));
  });
