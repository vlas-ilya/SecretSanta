import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthenticationState } from './model/SessionTypes';
import { LoadingStatus } from '../../../utils/classes/LoadingState';

export type State = {
  loadingStatus: LoadingStatus;
  authenticationState: AuthenticationState;
};

const session = createSlice({
  name: 'session',
  initialState: {
    loadingStatus: { state: 'INIT' },
    authenticationState: 'SHOULD_CHECK_SESSION',
  } as State,
  reducers: {
    changeLoadingStatus: (state: State, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    changeAuthenticationState: (
      state: State,
      action: PayloadAction<AuthenticationState>,
    ) => {
      state.authenticationState = action.payload;
    },
  },
});

export default session.reducer;
export const { changeLoadingStatus, changeAuthenticationState } = session.actions;
