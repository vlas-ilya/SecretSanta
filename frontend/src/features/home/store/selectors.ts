import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.home.loadingStatus;
export const selectGameId = (state: RootState) => state.home.gameId;