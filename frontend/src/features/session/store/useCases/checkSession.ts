import * as api from '../api/session.api';

import { changeAuthenticationState, changeLoadingStatus } from '../session.reducer';

import { Id } from 'model';
import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';

export const checkSession = (id: Id) =>
  fetchAction(
    changeLoadingStatus,
    changeAlert,
    async (dispatch) => {
      try {
        await api.checkSession(id);
        dispatch(changeAuthenticationState('AUTHENTICATED'));
      } catch (e) {
        if (e.response.status === 401) {
          dispatch(changeAuthenticationState('SHOULD_LOGIN'));
        } else if (e.response.status === 404) {
          dispatch(changeAuthenticationState('NOT_FOUND'));
        } else {
          dispatch(changeAuthenticationState('UNKNOWN_ERROR'));
        }
      }
    },
    undefined,
    true,
  );
