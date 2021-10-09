import { changeLoadingStatus, setPlayer } from '../player.reducer';

import { PlayerId } from 'model';
import { fetchAction } from '../../../../utils/fetch';
import { get } from '../api/player.api';

export const loadPlayerInfo = (id: PlayerId) =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const player = await get(id);
    dispatch(setPlayer(player));
  });
