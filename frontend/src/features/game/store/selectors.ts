import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.game.loadingStatus;
export const selectGame = (state: RootState) => state.game.game;
