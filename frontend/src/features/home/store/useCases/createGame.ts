import { changeGameId, changeLoadingStatus } from '../reducer';
import { fetchAction } from '../../../../utils/fetch';
import { create } from '../api/api';

export const createGame = () =>
  fetchAction(changeLoadingStatus, async (dispatch) => {
    const id = await create();
    dispatch(changeGameId(id));
  });
