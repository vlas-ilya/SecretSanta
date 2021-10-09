import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from 'model';
import { Player } from 'model';
import { PlayerChanges } from 'model';

export interface State {
  loadingStatus: LoadingStatus;
  player?: Player;
  backup?: Player;
}

export const player = createSlice({
  name: 'player',
  initialState: {
    loadingStatus: { state: 'INIT' },
  } as State,
  reducers: {
    changeLoadingStatus: (state: State, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    setPlayer: (state: State, action: PayloadAction<Player>) => {
      state.player = action.payload;
    },
    applyChanges: (state: State, action: PayloadAction<PlayerChanges>) => {
      if (state.player) {
        state.player.applyChanges(action.payload);
      }
    },
    backup: (state: State) => {
      state.backup = state.player;
    },
    clearBackup: (state: State) => {
      state.backup = undefined;
    },
    tryToRestoreFromBackup: (state: State) => {
      if (state.backup) {
        state.player = state.backup;
      }
    },
  },
});

export default player.reducer;

export const {
  changeLoadingStatus,
  setPlayer,
  applyChanges,
  backup,
  clearBackup,
  tryToRestoreFromBackup,
} = player.actions;
