import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.player.loadingStatus;
export const selectPlayer = (state: RootState) => state.player.player;
export const selectGame = (state: RootState) => state.player.game;
