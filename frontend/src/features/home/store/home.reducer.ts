import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameId } from 'model';
import { LoadingStatus } from 'model';

export interface State {
  loadingStatus: LoadingStatus;
  gameId?: GameId;
  alert?: {
    value: string;
    code: string;
    date: Date;
  };
}

export const home = createSlice({
  name: 'home',
  initialState: {
    loadingStatus: { state: 'INIT' },
  } as State,
  reducers: {
    changeLoadingStatus: (state: State, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    changeGameId: (state: State, action: PayloadAction<GameId>) => {
      state.gameId = action.payload;
    },
    changeAlert: (state: State, action: PayloadAction<string>) => {
      state.alert = {
        value: action.payload,
        code: action.payload,
        date: new Date(),
      };
    },
  },
});

export const { changeLoadingStatus, changeGameId, changeAlert } = home.actions;

export default home.reducer;
