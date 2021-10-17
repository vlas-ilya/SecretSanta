import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.home.loadingStatus;
export const selectGameId = (state: RootState) => state.home.gameId;
export const selectAlert = (state: RootState) => state.home.alert;
