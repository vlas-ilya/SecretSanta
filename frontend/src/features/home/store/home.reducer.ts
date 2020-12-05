import { GameId, LoadingState } from 'model/Types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import fetch, { fetchAction } from 'utils/fetch';

import { RootState } from 'store';

export interface State {
  loadingState: LoadingState;
  gameId?: GameId;
}

export const initialState: State = {
  loadingState: 'INIT',
};

export const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeLoadingState: (state: State, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    changeGameId: (state: State, action: PayloadAction<GameId>) => {
      state.gameId = action.payload;
    },
  },
});

export default home.reducer;

export const { changeLoadingState, changeGameId } = home.actions;

export const startGame = () =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const response = await fetch(`/api/game/`).post();
    dispatch(changeGameId(response.data));
  });

export const selectLoadingState = (state: RootState) => state.home.loadingState;
export const selectGameId = (state: RootState) => state.home.gameId;
