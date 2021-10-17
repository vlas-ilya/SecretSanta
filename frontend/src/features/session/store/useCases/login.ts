import * as api from '../api/session.api';

import { Id, Pin } from 'model';
import { changeAuthenticationState, changeLoadingStatus } from '../session.reducer';

import { changeAlert } from '../../../home/store/home.reducer';
import { fetchAction } from '../../../../utils/fetch';

export const login = (id: Id, pin: Pin | undefined) =>
  fetchAction(
    changeLoadingStatus,
    changeAlert,
    async (dispatch, state) => {
      try {
        await api.login(id, pin);
        dispatch(changeAuthenticationState('AUTHENTICATED'));
      } catch (e) {
        if (e.response.status !== 401) {
          throw e;
        }
        dispatch(
          changeAuthenticationState(
            state.session.authenticationState === 'SHOULD_LOGIN_WITH_PIN'
              ? 'WAS_INCORRECT_PIN'
              : 'SHOULD_LOGIN_WITH_PIN',
          ),
        );
      }
    },
    undefined,
    false,
  );
