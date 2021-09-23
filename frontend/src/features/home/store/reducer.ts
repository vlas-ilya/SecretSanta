import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameId } from '../../game/store/model/GameTypes';
import { LoadingStatus } from '../../../utils/classes/LoadingState';

export interface State {
  loadingStatus: LoadingStatus;
  gameId?: GameId;
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
  },
});

export const { changeLoadingStatus, changeGameId } = home.actions;

export default home.reducer;
