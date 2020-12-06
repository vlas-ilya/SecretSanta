import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PlayerChanges, PlayerId } from '../../../../../backend/src/model/PlayerTypes';
import fetch, { fetchAction } from 'utils/fetch';

import { GameVo } from '../../../model/GameVo';
import { LoadingState } from '../../../../../backend/src/model/LoadingState';
import { PlayerVo } from '../../../model/PlayerVo';
import { RootState } from 'store';

export interface State {
  loadingState: LoadingState;
  player: PlayerVo;
  game: GameVo;
}

export const initialState: State = {
  loadingState: 'INIT',
  player: new PlayerVo(),
  game: new GameVo(),
};

export const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeLoadingState: (state: State, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    changeGame: (state: State, action: PayloadAction<GameVo>) => {
      state.game = action.payload;
    },
    changePlayer: (state: State, action: PayloadAction<PlayerVo | PlayerChanges>) => {
      if ('field' in action.payload && 'value' in action.payload) {
        state.player[action.payload.field] = action.payload.value;
      } else {
        state.player = action.payload;
      }
    },
  },
});

export default player.reducer;

export const { changeLoadingState, changePlayer, changeGame } = player.actions;

export const loadGameInfo = (id: PlayerId) =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const response = await fetch(`/api/player/${id}/game`).get();
    dispatch(changeGame(response.data));
  });

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
export const selectGame = (state: RootState) => state.player.game;
