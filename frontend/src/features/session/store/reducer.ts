import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../utils/classes/LoadingState';

export type State = {
  loadingStatus: LoadingStatus;
  hasSession?: boolean;
};

const session = createSlice({
  name: 'session',
  initialState: {
    loadingStatus: { state: 'INIT' },
    hasSession: undefined,
  } as State,
  reducers: {
    changeLoadingStatus: (state: State, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    changeHasSession: (state: State, action: PayloadAction<boolean>) => {
      state.hasSession = action.payload;
    },
  },
});

export default session.reducer;
export const { changeLoadingStatus, changeHasSession } = session.actions;
