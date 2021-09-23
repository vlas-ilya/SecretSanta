import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameShortInfo } from './model/GameShortInfo';
import { LoadingStatus } from '../../../utils/classes/LoadingState';
import { Player } from './model/Player';
import { PlayerChanges } from './model/PlayerChange';

export interface State {
  loadingStatus: LoadingStatus;
  player?: Player;
  game?: GameShortInfo;
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
    setGame: (state: State, action: PayloadAction<GameShortInfo>) => {
      state.game = action.payload;
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
  setGame,
  setPlayer,
  applyChanges,
  backup,
  clearBackup,
  tryToRestoreFromBackup,
} = player.actions;
