import { changeLoadingStatus, setPlayer } from '../player.reducer';

import { PlayerId } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';
import { get } from '../api/player.api';

export const loadPlayerInfo = (id: PlayerId) =>
  fetchAction(changeLoadingStatus, changeAlert, async (dispatch) => {
    const player = await get(id);
    dispatch(setPlayer(player));
  });
