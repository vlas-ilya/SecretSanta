import { changeGameId, changeLoadingStatus } from '../reducer';

import { create } from '../api/api';
import { fetchAction } from '../../../../utils/fetch';

export const createGame = () =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const id = await create();
    dispatch(changeGameId(id));
  });
