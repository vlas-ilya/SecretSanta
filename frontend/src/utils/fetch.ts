import axios, { AxiosRequestConfig } from 'axios';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { LoadingStatus } from 'model';
import { RootState } from '../store';
import { changeAuthenticationState } from '../features/session/store/session.reducer';

export interface Options extends AxiosRequestConfig {}

const _fetch = (url: string, options: Options = {}) => {
  axios.defaults.withCredentials = true;
  const headers = options.headers || {};
  const requestOptions = {
    ...options,
    headers,
    url: url,
  };
  return axios(requestOptions);
};

const fetch = (url: string) => ({
  get: (options: Options = {}) => _fetch(url, { ...options, method: 'GET' }),
  post: (options: Options = {}) => _fetch(url, { ...options, method: 'POST' }),
  put: (options: Options = {}) => _fetch(url, { ...options, method: 'PUT' }),
  delete: (options: Options = {}) => _fetch(url, { ...options, method: 'DELETE' }),
});

export type Action = (dispatch: Dispatch, state: RootState) => Promise<any>;
export type Hooks = {
  onStart?: Action;
  onSuccess?: Action;
  onFail?: Action;
  onFinish?: Action;
};

export const fetchAction =
  (
    changeLoadingStatus: ActionCreatorWithPayload<LoadingStatus>,
    changeAlert: ActionCreatorWithPayload<string>,
    action: (dispatch: Dispatch, state: RootState) => Promise<void>,
    hooks?: Hooks,
    shouldReloginOnAuthError: boolean = true,
  ) =>
  async (dispatch: Dispatch, getState: Function) => {
    try {
      hooks?.onStart && (await hooks.onStart(dispatch, getState()));
      changeLoadingStatus && dispatch(changeLoadingStatus({ state: 'LOADING' }));
      await action(dispatch, getState());
      changeLoadingStatus && dispatch(changeLoadingStatus({ state: 'SUCCESS' }));
      hooks?.onSuccess && (await hooks.onSuccess(dispatch, getState()));
    } catch (e) {
      if (e.response?.status === 401 && shouldReloginOnAuthError) {
        dispatch(changeAuthenticationState('SHOULD_LOGIN'));
      }
      if (e.response?.data?.statusCode === 400) {
        dispatch(changeAlert(e.response?.data?.message));
      }
      changeLoadingStatus &&
        dispatch(
          changeLoadingStatus({
            state: 'FAIL',
            payload: e.response?.data?.message,
            errorCode: e.response?.status,
          }),
        );
      hooks?.onFail && (await hooks.onFail(dispatch, getState()));
    } finally {
      hooks?.onFinish && (await hooks.onFinish(dispatch, getState()));
    }
  };

export default fetch;
