import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'redux';

export interface Options extends AxiosRequestConfig {
  token?: string;
}

const _fetch = (url: string, options: Options = {}) => {
  axios.defaults.withCredentials = true;
  const headers = options.headers || {};
  if (options.token) {
    headers['Authorization'] = `Token ${options.token}`;
  }
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

export const fetchAction = (onStart: Function, onSuccess: Function, onError: Function) => (
  action: (dispatch: Dispatch, state: any) => Promise<void>,
) => async (dispatch: Dispatch, getState: Function) => {
  try {
    onStart && dispatch(onStart());
    await action(dispatch, getState());
    onSuccess && dispatch(onSuccess(dispatch));
  } catch (e) {
    onError && dispatch(onError(dispatch));
  }
};


export default fetch;
