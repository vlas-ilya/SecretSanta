import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Game } from './model/Game';
import { GameChanges } from './model/GameChange';
import { LoadingStatus } from '../../../utils/classes/LoadingState';

export type State = {
  loadingStatus: LoadingStatus;
  game?: Game;
  backup?: Game;
};

export const game = createSlice({
  name: 'game',
  initialState: {
    loadingStatus: { state: 'INIT' },
  } as State,
  reducers: {
    changeLoadingStatus: (state: State, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    setGame: (state: State, action: PayloadAction<Game>) => {
      state.game = action.payload;
    },
    applyChanges: (state: State, action: PayloadAction<GameChanges>) => {
      if (state.game) {
        state.game.applyChanges(action.payload);
      }
    },
    backup: (state: State) => {
      state.backup = state.game;
    },
    clearBackup: (state: State) => {
      state.backup = undefined;
    },
    tryToRestoreFromBackup: (state: State) => {
      if (state.backup) {
        state.game = state.backup;
      }
    },
  },
});

export default game.reducer;
export const {
  changeLoadingStatus,
  setGame,
  backup,
  applyChanges,
  clearBackup,
  tryToRestoreFromBackup,
} = game.actions;
