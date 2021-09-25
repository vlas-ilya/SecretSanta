import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.session.loadingStatus;
export const selectAuthenticationState = (state: RootState) =>
  state.session.authenticationState;
