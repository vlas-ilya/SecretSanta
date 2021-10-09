export type LoadingState = 'INIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

export type LoadingStatus = {
  state: LoadingState;
  payload?: string;
  errorCode?: number;
};
