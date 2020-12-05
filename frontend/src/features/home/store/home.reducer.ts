import { GameId, LoadingState } from 'model/Types';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import fetch, { fetchAction } from 'utils/fetch';

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

const action = fetchAction(changeLoadingState);

export const startGame = () =>
  action(async (dispatch) => {
    const response = await fetch(`/api/game/`).post();
    dispatch(changeGameId(response.data));
  });

const selectSelf = ({ home }: { home: State }) => home;

export const selectLoadingState = createSelector(selectSelf, (state) => state.loadingState);
export const selectGameId = createSelector(selectSelf, (state) => state.gameId);
