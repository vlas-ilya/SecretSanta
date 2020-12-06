import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PlayerChanges, PlayerId, PlayerPassword } from '../../../../../backend/src/model/PlayerTypes';
import fetch, { fetchAction } from 'utils/fetch';

import { GameVo } from '../../../model/GameVo';
import { LoadingState } from '../../../../../backend/src/model/LoadingState';
import { PlayerVo } from '../../../model/PlayerVo';
import { RootState } from 'store';
import { ChangePlayerPasswordMessage } from '../../../../../backend/src/model/ChangePlayerPasswordMessage';

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
    changePlayerPassword: (state: State, action: PayloadAction<[PlayerId, PlayerPassword]>) => {
      localStorage.setItem(`player-id-${action.payload[0]}`, action.payload[1]);
      state.player = {
        ...state.player,
        password: action.payload[1],
      };
    },
  },
});

export default player.reducer;

export const { changeLoadingState, changePlayer, changeGame, changePlayerPassword } = player.actions;

export const loadGameInfo = (id: PlayerId) =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const password = localStorage.getItem(`player-id-${id}`);
    const response = await fetch(`/api/player/${id}/game`).get({
      password
    });
    dispatch(changeGame(response.data));
  });

export const loadPlayerInfo = (id: PlayerId) =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const password = localStorage.getItem(`player-id-${id}`);
    const response = await fetch(`/api/player/${id}`).get({
      password
    });
    dispatch(changePlayer(response.data));
  });

export const changePassword = (changePasswordMessage: ChangePlayerPasswordMessage) =>
  fetchAction(changeLoadingState, async (dispatch, state) => {
    const password = localStorage.getItem(`player-id-${state.player.player.id}`);
    const response = await fetch(`/api/player/${state.player.player.id}/changePassword`).put({
      data: {
        message: changePasswordMessage,
      },
      password
    });

    dispatch(changePlayer(response.data));
    dispatch(changePlayerPassword([state.player.player.id, changePasswordMessage.newPassword]));
  });

export const updatePlayer = () =>
  fetchAction(changeLoadingState, async (dispatch, state) => {
    const password = localStorage.getItem(`player-id-${state.player.player.id}`);
    const response = await fetch(`/api/player/${state.player.player.id}`).put({
      data: state.player.player,
      password
    });
    dispatch(changePlayer(response.data));
  });

export const selectLoadingState = (state: RootState) => state.player.loadingState;
export const selectPlayer = (state: RootState) => state.player.player;
export const selectGame = (state: RootState) => state.player.game;
