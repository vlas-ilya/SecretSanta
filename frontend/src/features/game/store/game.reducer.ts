import { GameChanges, GameId, GamePassword } from '../../../../../backend/src/model/GameTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import fetch, { fetchAction } from 'utils/fetch';

import { ChangeGamePasswordMessage } from '../../../../../backend/src/model/ChangeGamePasswordMessage';
import { GameVo } from '../../../model/GameVo';
import { LoadingState } from '../../../../../backend/src/model/LoadingState';
import { RootState } from 'store';

export interface State {
  loadingState: LoadingState;
  game: GameVo;
}

export const initialState: State = {
  loadingState: 'INIT',
  game: new GameVo(),
};

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeLoadingState: (state: State, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    changeGame: (state: State, action: PayloadAction<GameVo | GameChanges>) => {
      if ('field' in action.payload && 'value' in action.payload) {
        state.game[action.payload.field] = action.payload.value;
      } else {
        state.game = action.payload;
      }
    },
    changeGamePassword: (state: State, action: PayloadAction<[GameId, GamePassword]>) => {
      localStorage.setItem(`game-id-${action.payload[0]}`, action.payload[1]);
      state.game = {
        ...state.game,
        password: action.payload[1],
      };
    },
  },
});

export default game.reducer;

export const { changeLoadingState, changeGame, changeGamePassword } = game.actions;

export const loadGameInfo = (id: GameId) =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const password = localStorage.getItem(`game-id-${id}`);
    const response = await fetch(`/api/game/${id}`).get({
      password,
    });
    dispatch(changeGame(response.data));
  });

export const updateGame = () =>
  fetchAction(changeLoadingState, async (dispatch, state) => {
    const password = localStorage.getItem(`game-id-${state.game.game.id}`);
    const response = await fetch(`/api/game/${state.game.game.id}`).put({
      data: state.game.game,
      password,
    });
    dispatch(changeGame(response.data));
  });

export const changePassword = (changePasswordMessage: ChangeGamePasswordMessage) =>
  fetchAction(changeLoadingState, async (dispatch, state) => {
    const password = localStorage.getItem(`game-id-${state.game.game.id}`);
    const response = await fetch(`/api/game/${state.game.game.id}/changePassword`).put({
      data: {
        message: changePasswordMessage,
      },
      password,
    });

    dispatch(changeGame(response.data));
    dispatch(changeGamePassword([state.game.game.id, changePasswordMessage.newPassword]));
  });

export const startGame = () =>
  fetchAction(changeLoadingState, async (dispatch, state) => {
    const password = localStorage.getItem(`game-id-${state.game.game.id}`);
    const response = await fetch(`/api/game/${state.game.game.id}/start`).get({
      password,
    });
    dispatch(changeGame(response.data));
  });

export const selectLoadingState = (state: RootState) => state.game.loadingState;
export const selectGame = (state: RootState) => state.game.game;
