import { Game, GameChanges, emptyGame } from 'model/Game';
import { GameId, LoadingState } from 'model/Types';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import fetch, { fetchAction } from 'utils/fetch';

export interface State {
  loadingState: LoadingState;
  game: Game;
}

export const initialState: State = {
  loadingState: 'INIT',
  game: emptyGame,
};

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeLoadingState: (state: State, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    changeGame: (state: State, action: PayloadAction<Game | GameChanges>) => {
      if ('field' in action.payload && 'value' in action.payload) {
        state.game[action.payload.field] = action.payload.value;
      } else {
        state.game = action.payload;
      }
    },
  },
});

export default game.reducer;

export const { changeLoadingState, changeGame } = game.actions;

const action = fetchAction(changeLoadingState);

export const loadGameInfo = (id: GameId) =>
  action(async (dispatch) => {
    const response = await fetch(`/api/game/${id}`).get();
    dispatch(changeGame(response.data));
  });

export const updateGame = () =>
  action(async (dispatch, state) => {
    const response = await fetch(`/api/game/${state.game.game.id}`).put({
      data: state.game.game,
    });
    dispatch(changeGame(response.data));
  });

export const startGame = () =>
  action(async (dispatch, state) => {
    const response = await fetch(`/api/game/${state.game.gameId}/start`).get();
    dispatch(changeGame(response.data));
  });

const selectSelf = ({ game }: { game: State }) => game;

export const selectLoadingState = createSelector<any, any, LoadingState>(
  selectSelf,
  (state) => state.loadingState,
);
export const selectGame = createSelector<any, any, Game>(selectSelf, (state) => state.game);
