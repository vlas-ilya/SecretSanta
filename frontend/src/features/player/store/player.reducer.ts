import { LoadingState, PlayerId } from 'model/Types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Player, PlayerChanges } from 'model/Player';
import fetch, { fetchAction } from 'utils/fetch';

import { RootState } from 'store';

export interface State {
  loadingState: LoadingState;
  player: Player;
}

export const initialState: State = {
  loadingState: 'INIT',
  player: new Player(),
};

export const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeLoadingState: (state: State, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    changePlayer: (state: State, action: PayloadAction<Player | PlayerChanges>) => {
      if ('field' in action.payload && 'value' in action.payload) {
        state.player[action.payload.field] = action.payload.value;
      } else {
        state.player = action.payload;
      }
    },
  },
});

export default player.reducer;

export const { changeLoadingState, changePlayer } = player.actions;

export const loadPlayerInfo = (id: PlayerId) =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const response = await fetch(`/api/player/${id}`).get();
    dispatch(changePlayer(response.data));
  });

export const updatePlayer = () =>
  fetchAction(changeLoadingState, async (dispatch, state) => {
    const response = await fetch(`/api/player/${state.player.player.id}`).put({
      data: state.player.player,
    });
    dispatch(changePlayer(response.data));
  });

export const selectLoadingState = (state: RootState) => state.player.loadingState;
export const selectPlayer = (state: RootState) => state.player.player;
