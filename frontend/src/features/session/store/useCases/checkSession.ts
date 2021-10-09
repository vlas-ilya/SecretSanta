import * as api from '../api/session.api';

import { changeAuthenticationState, changeLoadingStatus } from '../session.reducer';

import { Id } from '../model/SessionTypes';
import { fetchAction } from '../../../../utils/fetch';

export const checkSession = (id: Id) =>
  fetchAction(
    changeLoadingStatus,
    async (dispatch) => {
      try {
        await api.checkSession(id);
        dispatch(changeAuthenticationState('AUTHENTICATED'));
      } catch (e) {
        dispatch(changeAuthenticationState('SHOULD_LOGIN'));
      }
    },
    undefined,
    true,
  );
