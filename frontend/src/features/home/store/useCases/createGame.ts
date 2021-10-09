import { changeGameId, changeLoadingStatus } from '../home.reducer';

import { create } from '../api/home.api';
import { fetchAction } from '../../../../utils/fetch';

export const createGame = () =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const id = await create();
    dispatch(changeGameId(id));
  });
