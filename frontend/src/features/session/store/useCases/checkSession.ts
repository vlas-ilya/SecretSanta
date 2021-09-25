import * as api from '../api/api';

import { changeHasSession, changeLoadingStatus } from '../reducer';

import { fetchAction } from '../../../../utils/fetch';

export const checkSession = () =>
  fetchAction(
    changeLoadingStatus,
    async (dispatch) => {
      await api.checkSession();
      dispatch(changeHasSession(true));
    },
    undefined,
    true,
  );
