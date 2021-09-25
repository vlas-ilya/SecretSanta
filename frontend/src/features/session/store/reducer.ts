import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../utils/classes/LoadingState';

export type State = {
  loadingStatus: LoadingStatus;
  shouldInputPin: boolean;
  wasIncorrectPin?: boolean;
  hasSession?: boolean;
};

const session = createSlice({
  name: 'session',
  initialState: {
    loadingStatus: { state: 'INIT' },
    hasSession: undefined,
    wasIncorrectPin: false,
    shouldInputPin: false,
  } as State,
  reducers: {
    changeLoadingStatus: (state: State, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    changeHasSession: (state: State, action: PayloadAction<boolean>) => {
      state.hasSession = action.payload;
    },
    shouldInputPin: (state: State) => {
      state.shouldInputPin = true;
    },
    wasIncorrectPin: (state: State, action: PayloadAction<boolean>) => {
      state.wasIncorrectPin = action.payload;
    },
  },
});

export default session.reducer;
export const { changeLoadingStatus, changeHasSession, shouldInputPin, wasIncorrectPin } =
  session.actions;
