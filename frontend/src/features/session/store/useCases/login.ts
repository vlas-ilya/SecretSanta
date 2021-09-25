import * as api from '../api/api';

import { Id, Pin } from '../model/SessionTypes';
import {
  changeHasSession,
  changeLoadingStatus,
  shouldInputPin,
  wasIncorrectPin,
} from '../reducer';

import { fetchAction } from '../../../../utils/fetch';

export const login = (id: Id, pin: Pin | undefined) =>
  fetchAction(
    changeLoadingStatus,
    async (dispatch, state) => {
      try {
        dispatch(wasIncorrectPin(false));
        await api.login(id, pin);
        dispatch(changeHasSession(true));
      } catch (e) {
        if (e.response.status !== 401) {
          throw e;
        }
        if (state.session.shouldInputPin) {
          dispatch(wasIncorrectPin(true));
        }
        dispatch(shouldInputPin());
        dispatch(changeHasSession(false));
      }
    },
    undefined,
    false,
  );
